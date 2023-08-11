import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useCart} from "./Utils";
import {useAuth} from "./Login";

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
    const {authKey} = useAuth();
    useEffect(() => {
        if (authKey)
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

function CartProduct({jsonItem}) {
    const discountedPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    const quantity = jsonItem.quantity ? jsonItem.quantity : 1;
    return (
        <div className={"cart-item"}>
            <div className="cart-item-thumbnail-container">
                <img src={jsonItem.thumbnail} alt="item thumbnail" className="cart-item-thumbnail"/>
            </div>
            <div className="cart-item-info-container">
            <span className="cart-title-wrapper">
                <span className="cart-item-title">  {jsonItem.title}</span>
                <span className="cart-item-count" product_id={jsonItem.id}> x{quantity}</span>
            </span>
                <p className="cart-item-price"><s>${jsonItem.price * quantity}</s> ${discountedPrice.toFixed(2)}</p>
            </div>

        </div>
    );
}

function CartItems({cart, onMouseOver}) {
    return (
        <div className="cart-products" onMouseOver={onMouseOver}>
            {cart['products'] ? (
                cart.products.map((item) => {
                    return (
                        <CartProduct key={item.id} jsonItem={item}/>
                    );
                })
            ) : (
                <p>Loading cart...</p>
            )
            }
            <div className="cart-total">Total: ${
                cart['discountTotal'] ?
                    (cart['discountTotal'].toFixed(2))
                    : (0)
            }</div>
        </div>
    );
}

function Cart({count}) {
    const {cart} = useCart();

    return (
        <>
            <Link to={"/cart"} className={"cart-link"}>
                <div id="cart" className="fa-solid fa-cart-shopping" onMouseOver={(event) => {
                    document.querySelector('#cart-items').style.display = 'flex';
                }}>
                    <span id="cart-count">{count}</span>
                </div>
            </Link>
            <div id="cart-items" onMouseOut={() => {
                document.querySelector('#cart-items').style.display = 'none';
            }}>
                <CartItems cart={cart} onMouseOver={() =>
                    document.querySelector('#cart-items').style.display = 'flex'
                }/>
            </div>
        </>
    );
}

