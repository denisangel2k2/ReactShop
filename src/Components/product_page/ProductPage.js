import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductImages} from "./ProductImages";
import {ProductPageProduct} from "./ProductPageProduct";

function getProduct(id) {
    return fetch(`https://dummyjson.com/products/${id}`).then((response) => {
        return response.json();
    });
}
export function ProductPage() {
    const params = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        getProduct(params.id).then((json) => {
            setItem(json);
        });
    }, [params.id]);

    return (
        <div>
            {item && <ProductPageProduct jsonItem={item}/>}
        </div>
    );
}