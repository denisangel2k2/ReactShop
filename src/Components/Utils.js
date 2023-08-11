import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./login_page/Login";
import {getCart} from "./cart_page/CartPage";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setProds} from "../redux/slices/products";

export function Button({className, onClick,text,isButtonDisabled}) {
    return (
        <button className={className} onClick={onClick} disabled={isButtonDisabled}>{text}</button>
    );
}

const cartId="64d35475afd6c";

export function Product({jsonItem,isNotificationVisible,setIsNotificationVisible}){

    const {authKey}=useAuth();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const {cart,setCart}=useCart();

    const productId=jsonItem.id;
    useEffect(()=>{
        return ()=>{
            setTimeout(()=>{
                setIsNotificationVisible(false);
                setIsButtonDisabled(false);
            },5000);
        };
    },[isNotificationVisible]);

    async function addToCart(productId,quantity=1){

        // setCart([...cart,jsonItem]);
        // localStorage.setItem('cart',JSON.stringify([...cart,jsonItem]));

        return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authKey
            },
            body: JSON.stringify({"products": [{"id": productId, "quantity": quantity}]}),
        }).then(response => response.json()).then((json) => {

            return json;
        });
    }

    function handleClick(){
        setIsButtonDisabled(true);
        setIsNotificationVisible(true);
        if (!authKey)
        {
            setIsButtonDisabled(false);
            setIsNotificationVisible(false);
            alert("You need to be logged in to add products to cart.");
            return;
        }
        else
        addToCart(productId).then((json)=>{
            setCart(json.data);
            localStorage.setItem('cart',JSON.stringify(json.data));
        });

    }


    const discountPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    return (
        <div className="item">
            <Link to={`/products/${jsonItem.id}`} className={"item_link"}>
                <div className="item_thumbnail_container" product-id={jsonItem.id}>
                    <img className="item_thumbnail" src={jsonItem['thumbnail']} alt={jsonItem.title} loading="lazy" />
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
                    <Button className={"add_to_cart_btn"} onClick={handleClick} text={isButtonDisabled ? 'Added' : 'Add'} isButtonDisabled={isButtonDisabled}/>
                </div>
            </div>
        </div>
    );
}



export function useFetchProducts(api = 'https://dummyjson.com/products/?limit=10'){
    const dispatch = useDispatch();
    useEffect(()=>{
        async function fetchProducts() {
            try {
                const response = await fetch(api);
                const data = await response.json();
                dispatch(setProds(data.products));
            } catch (error) {
                dispatch(setProds([]));
            }
        }
        fetchProducts();
        // if (!localStorage.getItem('products'))
        //     localStorage.setItem('products',JSON.stringify(products));
    },[api]);

    // return [products,setProducts];
}
// Cart context
const cartContext= createContext();
export function CartProvider({children}){
    const [cart,setCart]=useState([]);
    const {authKey}=useAuth();
    useEffect(() => {
        if (!localStorage.getItem('cart')) {
            getCart(authKey).then((json) => {
                setCart(json.products);
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            setCart(JSON.parse(localStorage.getItem('cart')));
        }
    }, [authKey]);

    return (
        <cartContext.Provider value={{cart,setCart}}>
            {children}
        </cartContext.Provider>
    );
}

export function useCart(){
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
