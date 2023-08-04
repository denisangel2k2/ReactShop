import {useEffect} from "react";

export function Notification({message,isNotificationVisible,setIsNotificationVisible}) {
    const vizibilitate = isNotificationVisible ? 'visible' : 'hidden';

    return (

            <section className="notification-container" style={{visibility: vizibilitate}}>
                    <div id="notification">{message}</div>
            </section>

    );
}

export function Header() {
    return (
        <header>
            <h1>Thrift shop</h1>
            <nav>
                <Cart count={3}/>
            </nav>
        </header>
    );
}

function Cart({count}) {
    return (
        <>
            <div id="cart" className="fa-solid fa-cart-shopping">
                <span id="cart-count">{count}</span>
            </div>
            <div id="cart-items">
                <div className="cart-products">
                    <div className="cart-total"></div>
                </div>
            </div>
        </>
    );
}