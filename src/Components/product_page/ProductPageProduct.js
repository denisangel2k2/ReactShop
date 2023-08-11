import {ProductImages} from "./ProductImages";

export function ProductPageProduct({jsonItem}) {
    const discountPrice = (jsonItem.price * (1 - jsonItem.discountPercentage / 100)).toFixed(2);
    return (
        <div className="product">
            <ProductImages jsonItem={jsonItem}/>
            <div className="info">
                <div className="main-info">
                    <h1>{jsonItem.title}</h1>
                    <p>Price: ${discountPrice}</p>
                </div>
                <div className="item-section-2">
                    <p>Rating: {jsonItem.rating}</p>
                    <p>Stock: {jsonItem.stock}</p>
                </div>

                <p>{jsonItem.description}</p>

                <div className="item-section-1">
                    <p>Category: {jsonItem.category}</p>
                    <p>Brand: {jsonItem.brand}</p>
                </div>
            </div>
        </div>
    );
}