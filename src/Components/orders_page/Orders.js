import {Header} from "../header/Header";
import {Order} from "./Order";
import {OrderProduct} from "./OrderProduct";
import {useAuth} from "../login_page/Login";
import {useGetOrdersQuery} from "../../redux/apis";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function Orders() {
    const {authKey} = useAuth();
    const {
        data: orders,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetOrdersQuery(authKey);

    const [currentOrder, setCurrentOrder] = useState(null);

    return (
        <div id={"app"}>
            <Header/>


            <div className={"orders-main-title"}>
                <div className={"orders-container"}>

                    <div className={"orders-history-container"}>
                        <p>Your order history</p>
                        <div className={"orders-history"}>
                            {
                                orders && orders.map((item) => (
                                    <Order key={item._id} jsonItem={item} setCurrentOrder={setCurrentOrder}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className={"orders-products-container"}>
                        <p>Order products</p>
                        <div className={"order-products"}>
                            {
                                currentOrder &&
                                currentOrder.cart.products.map((item) => (
                                    <OrderProduct key={item._id} jsonItem={item}/>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}