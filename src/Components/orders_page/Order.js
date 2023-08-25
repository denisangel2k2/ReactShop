export function Order({jsonItem}) {
    return (
        <div className={"order"}>
            <div className={"order-info"}>
                <div className={"order-header"}>
                    <div className={"order-id"}>Order ID: {jsonItem._id}</div>

                </div>
                <div className={"order-details"}>
                    <div className={"order-date"}>Order Date: {jsonItem.date}</div>
                    <div className={"order-total"}>Order Total: ${Number(jsonItem.cart.discountTotal).toFixed(2)}</div>
                    {/*<div className={"order-status"}>Order Status: {jsonItem.status}</div>*/}
                    <div className={"order-address"}>Address: {jsonItem.address}</div>
                    <div className={"order-phone"}>Phone: {jsonItem.phone}</div>
                    <div className={"order-number-products"}>Products: {jsonItem.cart.totalQuantity}</div>
                </div>
            </div>
        </div>
    )
}