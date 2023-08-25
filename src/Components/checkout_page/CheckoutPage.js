import {Header} from "../header/Header";
import {useCart} from "../Utils";
import {useAuth} from "../login_page/Login";
import {useNavigate} from "react-router-dom";
import {getCart} from "../cart_page/CartPage";

export function CheckoutPage() {
    const {cart,setCart} = useCart();
    const {authKey, cartId} = useAuth();

    function placeOrder(phone, address, firstName, lastName) {
        return fetch("http://localhost:3001/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": authKey,
                "phone": phone,
                "address": address,
                "firstName": firstName,
                "lastName": lastName
            })
        });
    }


    function validatePhoneNumber(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }

    function handlePlaceOrder(e) {
        e.preventDefault();
        const phone = e.target.phone.value,
            address = e.target.address.value,
            firstName = e.target["first-name"].value,
            lastName = e.target["last-name"].value;

        if (!authKey) {
            alert("You need to be logged in to place an order.");
            return;
        }
        if (!validatePhoneNumber(phone) || !address || !firstName || !lastName) {
            alert("All fields are required.");
            return;
        }
        placeOrder(phone, address, firstName, lastName).then((response) => {
            if (response.ok) {
                alert("Order placed successfully.");
                getCart(authKey, cartId).then((json) => {
                    setCart(json);
                });
                window.location.href = "/orders";
            } else {
                alert("Order placement failed.");
            }
        }).catch((error) => {
            alert("An error occurred while placing the order.");
        });
    }

    return (
        <div id={"app"}>
            <Header/>
            <div className="checkout-main-content">
                <fieldset className="checkout-main-container">
                    <legend>User Information</legend>
                    <form onSubmit={handlePlaceOrder}>

                        <input type={"text"} placeholder={"First name"} name={"first-name"} id={"first-name"}/>
                        <input type={"text"} placeholder={"Last name"} name={"last-name"} id={"last-name"}/>
                        <input type={"text"} placeholder={"Address"} name={"address"} id={"address"}/>
                        <input type={"text"} placeholder={"Phone"} name={"phone"} id={"phone"}/>
                        <hr/>
                        <div className={"checkout-additional-info-controls"}>
                            <span>Total: ${cart ? Number(cart.discountTotal).toFixed(2) : 0}</span>
                            <input type={"submit"} id={"checkout-submit"} value={"Place order"}/>
                        </div>

                    </form>

                </fieldset>
            </div>
        </div>
    );
}