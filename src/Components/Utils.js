import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./login_page/Login";
import {getCart} from "./cart_page/CartPage";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setProds} from "../redux/slices/products";

export function Button({className, onClick, text, isButtonDisabled}) {
    return (
        <button className={className} onClick={onClick} disabled={isButtonDisabled}>{text}</button>
    );
}

export function Product({jsonItem, isNotificationVisible, setIsNotificationVisible}) {

    const {authKey, cartId} = useAuth();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const {setCart} = useCart();

    const productId = jsonItem.id;
    useEffect(() => {
        return () => {
            setTimeout(() => {
                setIsNotificationVisible(false);
                setIsButtonDisabled(false);
            }, 5000);
        };
    }, [isNotificationVisible]);

    async function addToCart(productId, quantity = 1) {

        return await fetch(`http://localhost:3001/cart/${cartId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "products": [{"id": productId, "quantity": quantity}],
                "token": authKey
            }),
        }).then(response => response.json()).then((json) => {
            return json;
        });
    }

    function handleClick() {
        setIsButtonDisabled(true);
        setIsNotificationVisible(true);
        if (!authKey) {
            setIsButtonDisabled(false);
            setIsNotificationVisible(false);
            alert("You need to be logged in to add products to cart.");
            return;
        } else
            addToCart(productId).then((json) => {
                setCart(json);
                localStorage.setItem('cart', JSON.stringify(json));
            });

    }


    const discountPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    return (
        <div className="item">
            <Link to={`/products/${jsonItem.id}`} className={"item_link"}>
                <div className="item_thumbnail_container" product-id={jsonItem.id}>
                    <img className="item_thumbnail" src={jsonItem['thumbnail']} alt={jsonItem.title} loading="lazy"/>
                </div>
            </Link>
            <div className="item_info_container">
                <div className="item_main_info">
                    <p className="item_title">{jsonItem.title}</p>
                    <p className="item_price">
                        <s>${jsonItem.price}</s> ${discountPrice.toFixed(2)}
                    </p>
                </div>
                <div className="item_secondary_info">
                    <p className="item_rating">Rating: {jsonItem.rating}/5</p>
                    <Button className={"add_to_cart_btn"} onClick={handleClick}
                            text={isButtonDisabled ? 'Added' : 'Add'} isButtonDisabled={isButtonDisabled}/>
                </div>
            </div>
        </div>
    );
}


// Cart context
const cartContext = createContext();

export function CartProvider({children}) {
    const [cart, setCart] = useState([]);
    const {authKey,cartId} = useAuth();
    useEffect(() => {
        if (authKey!==null){
            const localStorageCart= JSON.parse(localStorage.getItem('cart'));
            if (!localStorageCart) {
                getCart(authKey,cartId).then((json) => {
                    setCart(json.products);
                    localStorage.setItem('cart', JSON.stringify(cart));
                });
            } else {
                setCart(JSON.parse(localStorage.getItem('cart')));
            }
        }

    }, [authKey]);

    return (
        <cartContext.Provider value={{cart, setCart}}>
            {children}
        </cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}

//

export function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction(...args) {
        const context = this;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}
