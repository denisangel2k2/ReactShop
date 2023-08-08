import logo from './logo.svg';
import './App.css';
import {Header, Notification} from "./Components/Header";
import {Button, useFetchProducts} from "./Components/Utils";
import {FiltersSection, getItems, LoadMoreComponent, Pagination, Products} from "./Components/Main";
import {useEffect, useMemo, useState} from "react";
import {createBrowserRouter, Link, Route, Router, RouterProvider, Routes, useLoaderData} from "react-router-dom";

let router = createBrowserRouter([
    {
        path: "/home",
        loader: () => ({message: "Hello Data Router!"}),
        Component() {
            return <MainPage/>;
        },
    },
    {
        path: "/",
        loader: () => ({message: "Hello Data Router!"}),
        Component() {
            return <LandingPage/>;
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
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>;

}

function MainPage() {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [api, setApi] = useState(`https://dummyjson.com/products/?limit=100`);
    const [products, setProducts] = useFetchProducts(api);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [originalProducts, setOriginalProducts] = useState(products);


    //TODO: Useeffect for fetching, use a state that remembers the skip count and another stat that remembers the length of the current fetched items
    // when the length modifies and gets to 0 then we need to fetch again


    // useEffect(() => {
    //     setOriginalProducts(products);
    //     // setFilteredProducts(products);
    // }, [products]);

    // useEffect(() => {
    //     let updatedProducts = originalProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
    //     setFilteredProducts(updatedProducts);
    //
    // }, [originalProducts, searchText, selectedCategory]);
    //
    // useEffect(() => {
    //     let updatedProducts = originalProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
    //     setFilteredProducts(updatedProducts);
    //
    // }, [originalProducts, selectedCategory]);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                let searchedProducts;
                if (!localStorage.getItem('products'))
                    searchedProducts = await getItems(`https://dummyjson.com/products?limit=100`);
                else searchedProducts = JSON.parse(localStorage.getItem('products'));

                let updatedProducts = searchedProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
                let index = searchedProducts.findIndex(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
                const itemFoundOnPage = Math.floor(index / itemsPerPage) + 1;

                if (isMounted) {
                    setProducts(updatedProducts);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };

    }, [searchText]);


    return (
        <div id="app">
            <Notification isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible}
                          message="Added to cart"/>
            <Header/>
            <main>
                <FiltersSection setApi={setApi}
                                setSearchText={setSearchText}
                                setSelectedCategory={setSelectedCategory}
                                setCurrentPage={setCurrentPage}
                                itemsPerPage={itemsPerPage}
                                searchText={searchText}
                                setProducts={setProducts}
                />
                <Products products={filteredProducts}
                          isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible}/>
            </main>

            />
            <Pagination filteredProducts={filteredProducts}
                        setFilteredProducts={setFilteredProducts}
                        setProducts={setProducts}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        selectedCategory={selectedCategory}
                        products={products}
            />

        </div>
    );
}

export default App;
