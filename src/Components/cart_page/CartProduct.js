import {useAuth} from "../login_page/Login";
import {debounce, useCart} from "../Utils";
const cartId="64d35475afd6c";
export function CartProduct({jsonItem}){
    const productId=jsonItem.id;
    const {authKey}=useAuth();
    const {cart,setCart}=useCart();
    let value=0;
    const debouncedUpdateQuantity = debounce((productId, quantity) => {
        if (Number(jsonItem.quantity)+quantity<=0){
            deleteProduct(productId).then((json) => {
                setCart(json.data);
                localStorage.setItem('cart', JSON.stringify(json.data));
            });
        }
        else{
            updateQuantity(productId, quantity).then((json) => {
                setCart(json.data);
                localStorage.setItem('cart', JSON.stringify(json.data));

            });
        }
    }, 1000);


    function handleClickQuantityLower() {
        value-=1;
        debouncedUpdateQuantity(productId, value);

    }

    function handleClickQuantityHigher() {
        value+=1;
        debouncedUpdateQuantity(productId, value); // Debounced call

    }


    function deleteProduct(productId){
        return fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}?products[]=${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authKey
            }
        }).then(response => response.json()).then((json) => {
            return json;
        });
    }
    function updateQuantity(productId, quantity) {
        return fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authKey
            },
            body: JSON.stringify({ products: [{ id: productId, quantity: quantity }] }),
        })
            .then(response => response.json())
            .then((json) => {
                return json;
            });
    }




    return(
        <div className="cartpage-product">
            <div className="cartpage-product-image">
                <img src={jsonItem['thumbnail']} alt={jsonItem.title} loading="lazy" />
            </div>
            <div className="cartpage-product-info">
                <div className="cartpage-product-name">{jsonItem.title}</div>
                <div className="cartpage-product-price"
                     product-id={jsonItem.id}>${

                    Number(jsonItem['discountedPrice']).toFixed(2)
                }</div>
                <div className="cartpage-product-controls">
                    <div className="lower-btn" onClick={handleClickQuantityLower} product-id={jsonItem.id} unselectable="on">&lt;</div>
                    <div className="quantity" product-id={jsonItem.id}>{jsonItem.quantity}</div>
                    <div className="higher-btn" onClick={handleClickQuantityHigher} product-id={jsonItem.id} unselectable="on">&gt;</div>
                </div>
            </div>
        </div>
    );
}

