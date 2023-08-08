import {useEffect, useState} from "react";

export function Button({className, onClick,text}){
    return (
        <button className={className} onClick={onClick}>{text}</button>
    );
}

export function Product({jsonItem,isNotificationVisible,setIsNotificationVisible}){
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productId=jsonItem.id;
    useEffect(()=>{
        return ()=>{
            setTimeout(()=>{
                setIsNotificationVisible(false);
                setIsButtonDisabled(false);
            },5000);
        };
    },[isNotificationVisible]);
    function handleClick(){
        setIsButtonDisabled(true);
        setIsNotificationVisible(true);

    }
    const discountPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    return (
        <div className="item">
            <div className="item_thumbnail_container" product-id={jsonItem.id}>
                <img className="item_thumbnail" src={jsonItem['thumbnail']} alt={jsonItem.title} loading="lazy" />
            </div>
            <div className="item_info_container">
                <div className="item_main_info">
                    <p className="item_title">{jsonItem.title}</p>
                    <p className="item_price">
                        <s>${jsonItem.price}</s> ${discountPrice.toFixed(2)}
                    </p>
                </div>
                <div className="item_secondary_info">
                    <p className="item_rating">Rating: {jsonItem.rating}/5</p>
                    <Button className={"add_to_cart_btn"} onClick={handleClick} text={isButtonDisabled ? 'Added' : 'Add'} disabled={isButtonDisabled} />
                </div>
            </div>
        </div>
    );
}

export function useFetchProducts(api = 'https://dummyjson.com/products/?limit=10'){
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        async function fetchProducts() {
            try {
                const response = await fetch(api);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setProducts([]);
            }
        }
        fetchProducts();
        // if (!localStorage.getItem('products'))
        //     localStorage.setItem('products',JSON.stringify(products));
    },[api]);

    return [products,setProducts];
}