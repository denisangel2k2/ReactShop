import {Product} from "../Utils";

export function Products({products, isNotificationVisible, setIsNotificationVisible}) {

    const productElements = products.map((product) => {
        return (
            <Product key={product.id} jsonItem={product} isNotificationVisible={isNotificationVisible}
                     setIsNotificationVisible={setIsNotificationVisible}/>
        );
    });

    return (
        <div className="shop-items">
            {productElements}
        </div>
    );
}