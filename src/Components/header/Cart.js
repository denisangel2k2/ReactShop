import {useCart} from "../Utils";
import {Link} from "react-router-dom";
import {CartItems} from "./CartItems";

export function Cart({count}) {
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
