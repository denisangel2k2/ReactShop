import {Header, Notification} from "../Header";

export function Navbar(isNotificationVisible, setIsNotificationVisible) {
    console.log(isNotificationVisible);
    return (
        <div>
            <Notification isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible}
                          message="Added to cart"/>
            <Header/>
        </div>
    );
}