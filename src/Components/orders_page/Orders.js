import {Header} from "../header/Header";
import {Order} from "./Order";
import {OrderProduct} from "./OrderProduct";

const dummyJson={"_id": "64e746414fcd7ce0d748fe29",
"userId": "64e47b88f2613d6077e479f7",
    "address": "address 1",
    "phone": "0743924123",
    "cart": {
    "total": 17956,
        "discountTotal": 20563.527199999997,
        "totalProducts": 7,
        "totalQuantity": 28,
        "products": [
        {
            "id": 2,
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 899,
            "discountedPercentage": 17.94,
            "rating": 4.44,
            "stock": 34,
            "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
            "quantity": 7,
            "total": 1798,
            "discountedPrice": 1475.4388,
            "_id": {
                "$oid": "64e4a314f65658717118ccea"
            }
        },
        {
            "id": 4,
            "title": "OPPOF19",
            "description": "OPPO F19 is officially announced on April 2021.",
            "price": 280,
            "discountedPercentage": 17.91,
            "rating": 4.3,
            "stock": 123,
            "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
            "quantity": 4,
            "total": 280,
            "discountedPrice": 229.85199999999998,
            "_id": {
                "$oid": "64e4a557b118e0b0306371fc"
            }
        },
        {
            "id": 8,
            "title": "Microsoft Surface Laptop 4",
            "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
            "price": 1499,
            "discountedPercentage": 10.23,
            "rating": 4.43,
            "stock": 68,
            "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
            "quantity": 2,
            "total": 1499,
            "discountedPrice": 1345.6523,
            "_id": {
                "$oid": "64e4a65bb123ba13c4c249c4"
            }
        },
        {
            "id": 5,
            "title": "Huawei P30",
            "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
            "price": 499,
            "discountedPercentage": 10.58,
            "rating": 4.09,
            "stock": 32,
            "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
            "quantity": 7,
            "total": 499,
            "discountedPrice": 446.2058,
            "_id": {
                "$oid": "64e4a7e7b348442d38f9b6dc"
            }
        },
        {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountedPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            "quantity": 5,
            "total": 549,
            "discountedPrice": 477.84959999999995,
            "_id": {
                "$oid": "64e5d8a6b66acd13c5fc31e2"
            }
        },
        {
            "id": 88,
            "title": "TC Reusable Silicone Magic Washing Gloves",
            "description": "TC Reusable Silicone Magic Washing Gloves with Scrubber, Cleaning Brush Scrubber Gloves Heat Resistant Pair for Cleaning of Kitchen, Dishes, Vegetables and Fruits, Bathroom, Car Wash, Pet Care and Multipurpose",
            "price": 29,
            "discountedPercentage": 3.19,
            "rating": 4.98,
            "stock": 42,
            "thumbnail": "https://i.dummyjson.com/data/products/88/thumbnail.jpg",
            "quantity": 2,
            "total": 29,
            "discountedPrice": 28.0749,
            "_id": {
                "$oid": "64e5ee6ab244f5b892376895"
            }
        },
        {
            "id": 3,
            "title": "Samsung Universe 9",
            "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
            "price": 1249,
            "discountedPercentage": 15.46,
            "rating": 4.09,
            "stock": 36,
            "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
            "quantity": 1,
            "total": 1249,
            "discountedPrice": 1055.9045999999998,
            "_id": {
                "$oid": "64e608e8d255ff473409ad0b"
            }
        }
    ]
},
"__v": 0
};
export function Orders(){
    return (
        <div id={"app"}>
            <Header/>

            <h1>Your order history</h1>
            <div className={"orders-container"}>

                <div className={"orders-history"}>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                    <Order jsonItem={dummyJson}/>
                </div>
                <div className={"order-products"}>
                        {
                            dummyJson.cart.products.map((item)=>(
                                <OrderProduct jsonItem={item}/>
                            ))
                        }

                </div>
            </div>
        </div>
    )
}