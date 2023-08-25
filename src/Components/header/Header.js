import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useCart} from "../Utils";
import {useAuth} from "../login_page/Login";
import {Cart} from "./Cart";

export function Notification({message, isNotificationVisible, setIsNotificationVisible}) {
    const vizibilitate = (isNotificationVisible===true) ? 'visible' : 'hidden';

    return (
        <section className="notification-container" style={{visibility: vizibilitate}}>
            <div id="notification">{message}</div>
        </section>

    );
}

export function Header() {
    const {cart} = useCart();
    const [cartLength, setCartLength] = useState(0);
    const {authKey} = useAuth();
    useEffect(() => {
        if (authKey && cart){
            setCartLength(cart.totalQuantity);
            // localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart,authKey]);
    return (
        <header>
            <Link to={"/shop"} className={"home-logo"}>
                <h1>Thrift shop</h1>
            </Link>
            <nav>

                <Link to={"/account"} className={"account-link"}>
                    <div id="account" className="fa-solid fa-user">
                    </div>
                </Link>

                <Link to={"/orders"} className={"order-link"}>
                    <div id="orders" className="fa-solid fa-truck-fast"></div>
                </Link>

                <Cart count={cartLength}/>

            </nav>
        </header>
    );
}




