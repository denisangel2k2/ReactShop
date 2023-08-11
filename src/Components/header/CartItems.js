import {CartProduct} from "./CartHeaderProduct";

export function CartItems({cart, onMouseOver}) {
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