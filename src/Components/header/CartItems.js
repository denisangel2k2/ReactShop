import {CartProduct} from "./CartHeaderProduct";

export function CartItems({cart, onMouseOver}) {
    return (
        <div className="cart-products" onMouseOver={onMouseOver}>
            {cart && cart['products'] ? (
                cart.products.map((item) => {
                    return (
                        <CartProduct key={item.id} jsonItem={item}/>
                    );
                })
            ) : (
                <p>No items in cart</p>
            )
            }
            <div className="cart-total">Total: ${
                cart && cart['discountTotal'] ?
                    (cart['discountTotal'].toFixed(2))
                    : (0)
            }</div>
        </div>
    );
}