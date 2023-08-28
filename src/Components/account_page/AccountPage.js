import {useAuth} from "../login_page/Login";
import {useCart} from "../Utils";
import {Header} from "../header/Header";

export function AccountPage() {
    const {authKey, email, logout} = useAuth();
    const {setCart}=useCart();
    function handleLogout(){

        fetch(`http://localhost:3001/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': authKey
            }
        }).then((response)=>{
            if(response.ok){
                logout();
            }
            else{
                alert("An error occurred while logging out.");
            }
        }).catch((error)=>{
            alert("An error occurred while logging out.");
        });

    }
    return (
        <div id="app">
            <Header/>
            <div className={"account-main"}>
                <div className={"account-wrapper"}>
                    <h1>Account page</h1>
                    <div className={"account-item"}>
                        <div>Your authkey:</div>
                        <div> {authKey}</div>
                    </div>
                    <div className={"account-item"}>
                        <div>Your email:</div>
                        <div> {email}</div>
                    </div>
                </div>
                <button className={"logout-btn"} onClick={handleLogout}>Logout</button>
            </div>
        </div>


    );
}