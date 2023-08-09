import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useCart} from "./Utils";

export function Notification({message, isNotificationVisible, setIsNotificationVisible}) {
    const vizibilitate = isNotificationVisible ? 'visible' : 'hidden';

    return (

        <section className="notification-container" style={{visibility: vizibilitate}}>
            <div id="notification">{message}</div>
        </section>

    );
}

export function Header() {
    const {cart} = useCart();
    const [cartLength, setCartLength] = useState(cart.length);

    useEffect(() => {
        setCartLength(cart.totalQuantity);
    }, [cart]);
    return (
        <header>
            <h1>Thrift shop</h1>

            <nav>

                <Link to={"/account"} className={"account-link"}>
                    <div id="account" className="fa-solid fa-user">
                    </div>
                </Link>


                <Cart count={cartLength}/>

            </nav>
        </header>
    );
}

function Cart({count}) {
    return (
        <>

            <Link to={"/cart"} className={"cart-link"}>
                <div id="cart" className="fa-solid fa-cart-shopping">
                    <span id="cart-count">{count}</span>
                </div>
            </Link>
            <div id="cart-items">
                <div className="cart-products">
                    <div className="cart-total"></div>
                </div>
            </div>
        </>
    );
}

