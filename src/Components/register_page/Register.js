import {useNavigate} from "react-router-dom";

export function Register(){

    const navigate=useNavigate();
    function validateEmail(email){
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    function register(email,password){
        return fetch("http://localhost:3001/register",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                "email":email,
                "password":password
            })
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const email=e.target.email.value,
            password=e.target.password.value;
        if (!validateEmail(email)){
            alert("Invalid email address.");
            return;
        }
        if (password.length<8){
            alert("Password must be at least 8 characters long.");
            return;
        }
        register(email,password).then((response)=>{
            if (response.ok){
                alert("Registration successful.");
                navigate("/login");
            }
            else{
                alert("Registration failed.");
            }
        }).catch((error)=>{
            alert("An error occurred while registering.");
        });


    }
    return (
        <div id="app">
            <div className="box">
                <div className="login-container">
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" name={"email"} id={"email"}/>
                            <input type="password" placeholder="Password" name={"password"} id={"password"}/>
                            <input type="submit"/>
                        </form>
                </div>
            </div>
        </div>
    );
}