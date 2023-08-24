import {Header, Notification} from "../Header";

export function Navbar(isNotificationVisible, setIsNotificationVisible) {
    return (
        <div>
            <Notification isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible}
                          message="Added to cart"/>
            <Header/>
        </div>
    );
}