import {useAuth} from "../login_page/Login";
import {debounce, useCart} from "../Utils";

export function CartProduct({jsonItem}) {
    const productId = jsonItem.id;
    const {authKey, cartId} = useAuth();
    const {setCart} = useCart();
    let value = 0;
    const debouncedUpdateQuantity = debounce((productId, quantity) => {
        if (Number(jsonItem.quantity) + quantity <= 0) {
            deleteProduct(productId, cartId).then((json) => {
                setCart(json);
                // localStorage.setItem('cart', JSON.stringify(json));
            });
        } else {
            updateQuantity(productId, quantity, cartId).then((json) => {
                setCart(json);
                // localStorage.setItem('cart', JSON.stringify(json));

            });
        }
    }, 1000);


    function handleClickQuantityLower() {
        value -= 1;
        debouncedUpdateQuantity(productId, value);

    }

    function handleClickQuantityHigher() {
        value += 1;
        debouncedUpdateQuantity(productId, value); // Debounced call

    }


    function deleteProduct(productId, cartId) {
        return fetch(`http://localhost:3001/cart/${cartId}`, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json',
                "token": authKey
            }, body: JSON.stringify({
                "product_id": productId
            })
        }).then(response => response.json()).then((json) => {
            return json;
        });
    }

    async function updateQuantity(productId, quantity, cartId) {
        return await fetch(`http://localhost:3001/cart/${cartId}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
                "token": authKey
            }, body: JSON.stringify({
                "products": [{"id": productId, "quantity": quantity}]
            }),
        }).then(response => response.json()).then((json) => {
            return json;
        });
    }


    return (<div className="cartpage-product">
            <div className="cartpage-product-image">
                <img src={jsonItem['thumbnail']} alt={jsonItem.title} loading="lazy"/>
            </div>
            <div className="cartpage-product-info">
                    <div className="title-and-description">
                        <div className="cartpage-product-name">{jsonItem.title}</div>
                        <div className="cartpage-product-description">{jsonItem.description}</div>
                    </div>

                    <div className="price-and-controls">
                        <div className="cartpage-product-price"
                             product-id={jsonItem.id}>${Number(jsonItem['discountedPrice']).toFixed(2)}</div>

                        <div className="cartpage-product-controls">
                            <div className="lower-btn" onClick={handleClickQuantityLower} product-id={jsonItem.id}
                                 unselectable="on">-</div>
                            <div className="quantity" product-id={jsonItem.id}>{jsonItem.quantity}</div>
                            <div className="higher-btn" onClick={handleClickQuantityHigher} product-id={jsonItem.id}
                                 unselectable="on">+</div>
                        </div>
                    </div>

            </div>
        </div>);
}

