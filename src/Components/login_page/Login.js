import {createContext, useContext, useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useCart} from "../Utils";

export function Login() {
    const {login, AUTH_API} = useAuth();


    async function handleLogin(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const loginData = {
            email: email,
            password: password
        }

        try {
            const response = await fetch(AUTH_API, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginData)
            });

            const responseData = await response.json();

            if (response.ok) {
                login(responseData.token,email,responseData.cartId);
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            alert("An error occurred while logging in.");
        }


    }

    return (

        <div className={"login-container"}>
            <h1>Login into your THRIFT SHOP account</h1>
            <form onSubmit={handleLogin}>
                <input type="email" name={"email"} id={"email"} placeholder={"Email"}/>
                <input type={"password"} name={"password"} id={"password"} placeholder={"Password"}/>
                <input type="submit"/>
            </form>
            <Link to={"/register"}>Don't have an account? Register here.</Link>
        </div>
    );
}

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authKey, setAuthKey] = useLocalStorage("authKey", null);
    const [email,setEmail]=useLocalStorage("email",null);
    const [cartId,setCartId]=useLocalStorage("cartId",null);
    const navigate = useNavigate();
    const [AUTH_API] = useState("http://localhost:3001/login");

    const login = async (token,email,cart_id) => {
        setAuthKey(token);
        setEmail(email);
        setCartId(cart_id);
        try {
            navigate("/shop");
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setAuthKey(null);
        setEmail(null);
        setCartId(null);
        // localStorage.setItem('cart', JSON.stringify(null));
        navigate("/login", {replace: true});

    };

    const value = useMemo(
        () => ({
            authKey,
            AUTH_API,
            cartId,
            login,
            logout,
            email
        }),
        [authKey]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};