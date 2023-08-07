import logo from './logo.svg';
import './App.css';
import {Header, Notification} from "./Components/Header";
import {useFetchProducts} from "./Components/Utils";
import {Main} from "./Components/Main";
import {useState} from "react";

function App() {
    const [api,setApi] = useState('https://dummyjson.com/products/?limit=10');
    const [products,setProducts]=useFetchProducts(api);
    const [isNotificationVisible,setIsNotificationVisible] = useState(false);
    return (
        <div id="app">
            <Notification isNotificationVisible={isNotificationVisible} setIsNotificationVisible={setIsNotificationVisible} message="Added to cart"/>
            <Header/>
            <Main products={products} setProducts={setProducts} setApi={setApi} isNotificationVisible={isNotificationVisible} setIsNotificationVisible={setIsNotificationVisible}/>
        </div>
    );
}

export default App;
