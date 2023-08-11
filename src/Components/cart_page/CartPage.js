import {useAuth} from "../login_page/Login";
import {CartProvider, useCart} from "../Utils";
import React, {useEffect, useState} from "react";
import {CartProduct} from "./CartProduct";

const cartId="64d35475afd6c";
export function CartPage(){
    const {cart}=useCart();
    return (
            <div className="main-content">
                <div className="main-container">
                        <CartpageProducts/>
                </div>
                <div className="checkout-wrapper">
                    <div className="cartpa ge-total">
                        <div className="total-price">Total: ${
                            cart["discountTotal"] ?
                            cart["discountTotal"].toFixed(2) : 0
                        }</div>
                    </div>

                    <button className="checkout-button">Check out</button>
                </div>
            </div>
    );
}

export async function getCart(authKey) {
    const response = await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Internship-Auth': authKey
        }
    });
    const json = await response.json();
    return json;
}
function CartpageProducts(){
    const {authKey}=useAuth();
    const {cart,setCart}=useCart();


    useEffect(()=>{
        getCart(authKey).then((json)=>{
            setCart(json);
        });
    },[authKey]);


    return(
        <div className="cartpage-products">
            {cart['products'] ? (
                cart['products'].map((item) => (
                    <CartProduct key={item.id} jsonItem={item} />
                ))
            ) : (
                <p>Loading cart...</p>
            )}
        </div>
    );
}
