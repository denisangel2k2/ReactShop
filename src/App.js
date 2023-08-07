import logo from './logo.svg';
import './App.css';
import {Header, Notification} from "./Components/Header";
import {Button, useFetchProducts} from "./Components/Utils";
import {FiltersSection, LoadMoreComponent, Products} from "./Components/Main";
import {useEffect, useMemo, useState} from "react";
import {createBrowserRouter, Link, Route, Router, RouterProvider, Routes, useLoaderData} from "react-router-dom";

let router = createBrowserRouter([
    {
        path: "/home",
        loader: () => ({ message: "Hello Data Router!" }),
        Component() {
            return <MainPage />;
        },
    },
    {
        path: "/",
        loader: () => ({ message: "Hello Data Router!" }),
        Component() {
            return <LandingPage />;
        }
    }
]);

function LandingPage() {
    return (
        <div className={"landing-page"}>
            <div className={"landing-container"}>
                    <h1 className={"animate-character"}>THRIFT SHOP!</h1>
                    <h1 className={"animate-character"}>THRIFT SHOP!</h1>

            </div>
            <Link to="home" className={"landing-link"}>Go to the home page</Link>
        </div>
    );
}
function App() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;

}

function MainPage() {
    const [api, setApi] = useState('https://dummyjson.com/products/?limit=3');
    const [products, setProducts] = useFetchProducts(api);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [originalProducts, setOriginalProducts] = useState(products);
    const [currentSkip, setCurrentSkip] = useState(3);

    useEffect(() => {
        setOriginalProducts(products);
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        let updatedProducts = originalProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredProducts(updatedProducts);

    }, [originalProducts, searchText, selectedCategory]);


    return (
        <div id="app">
            <Notification isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible} message="Added to cart"/>
            <Header/>
            <main>
                <FiltersSection setApi={setApi} setSearchText={setSearchText}
                                setSelectedCategory={setSelectedCategory} setCurrentSkip={setCurrentSkip}/>
                <Products products={filteredProducts} isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible}/>
            </main>
            <LoadMoreComponent selectedCategory={selectedCategory} setProducts={setProducts} products={products}
                               currentSkip={currentSkip} setCurrentSkip={setCurrentSkip} setApi={setApi}
            />

        </div>
    );
}

export default App;
