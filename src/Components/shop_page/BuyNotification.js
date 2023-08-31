export function BuyNotification({jsonItem}){
    return (
        <div className={"buy-notification"}>
            <div className={"image"}></div>
            <div className={"information"}>
                <p>Cristian bought a {} five minutes ago.</p>
            </div>
        </div>
    )
}