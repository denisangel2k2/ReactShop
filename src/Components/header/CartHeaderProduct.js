export function CartProduct({jsonItem}) {
    const discountedPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    const quantity = jsonItem.quantity ? jsonItem.quantity : 1;
    return (
        <div className={"cart-item"}>
            <div className="cart-item-thumbnail-container">
                <img src={jsonItem.thumbnail} alt="item thumbnail" className="cart-item-thumbnail"/>
            </div>
            <div className="cart-item-info-container">
            <span className="cart-title-wrapper">
                <span className="cart-item-title">  {jsonItem.title}</span>
                <span className="cart-item-count" product_id={jsonItem.id}> x{quantity}</span>
            </span>
                <p className="cart-item-price"><s>${jsonItem.price * quantity}</s> ${discountedPrice.toFixed(2)}</p>
            </div>

        </div>
    );
}

