import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductImages} from "./ProductImages";
import {ProductPageProduct} from "./ProductPageProduct";
import {Header} from "../header/Header";

function getProduct(id) {
    return fetch(`http://localhost:3001/products/${id}`).then((response) => {
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
        <div id={"app"}>
            <Header/>
            {item && <ProductPageProduct jsonItem={item}/>}
        </div>
    );
}