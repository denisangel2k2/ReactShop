export function OrderProduct({jsonItem}){
    return(
        <div className={"order-product"}>
            <img src={jsonItem.thumbnail} alt={jsonItem.title}/>
            <div className={"order-product-info"}>

                <div className={"order-product-title"}>{jsonItem.title} x {jsonItem.quantity}</div>
                <div className={"order-product-total"}>Total: <span style={{color: "red"}}> ${(Number(jsonItem.quantity)*Number(jsonItem.discountedPrice)).toFixed(2)}</span></div>
            </div>
        </div>
    )
}