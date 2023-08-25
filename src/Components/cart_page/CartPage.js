import {useAuth} from "../login_page/Login";
import {CartProvider, useCart} from "../Utils";
import React, {useEffect, useState} from "react";
import {CartProduct} from "./CartProduct";
import {Header} from "../header/Header";
import {useNavigate} from "react-router-dom";

export function CartPage(){
    const {cart}=useCart();
    const navigate=useNavigate();
    return (
        <div id={"app"}>
            <Header/>
            <div className="main-content">
                <div className="main-container">
                        <CartpageProducts/>
                </div>
                <div className="checkout-wrapper">
                    <div className="cartpage-total">
                        <div className="total-price">Total: ${
                            cart["discountTotal"] ?
                            cart["discountTotal"].toFixed(2) : 0
                        }</div>
                    </div>


                    <button className="checkout-button" onClick={()=>{
                        navigate("/placeorder");
                    }}>Check out</button>
                </div>
            </div>
        </div>
    );
}

export async function getCart(authKey,cart_id) {
    const response = await fetch(`http://localhost:3001/cart/${cart_id}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            "token": authKey
        }
    });

    const json = await response.json();
    return json;
}
function CartpageProducts(){
    const {authKey,cartId}=useAuth();
    const {cart,setCart}=useCart();


    // useEffect(()=>{
    //     if (authKey && cart) {
    //         getCart(authKey, cartId).then((json) => {
    //             setCart(json);
    //         });
    //     }
    // },[authKey]);


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
