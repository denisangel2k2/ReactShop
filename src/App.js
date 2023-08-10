import logo from './logo.svg';
import './App.css';
import {Header, Notification} from "./Components/Header";
import {Button, CartProvider, useFetchProducts} from "./Components/Utils";
import {FiltersSection, getItems, LoadMoreComponent, MainPage, Pagination, Products} from "./Components/Main";
import {useEffect, useMemo, useState} from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    Link, Navigate,
    Route,
    Router,
    RouterProvider,
    Routes,
    useLoaderData,
    useRoutes
} from "react-router-dom";
import {AuthProvider, Login, useAuth} from "./Components/Login";
import {LandingPage} from "./Components/LandingPage";
import {CartPage} from "./Components/CartPage";
import {AccountPage} from "./Components/AccountPage";
import {ProductPage} from "./Components/ProductPage";
import {Provider} from "react-redux";
import {store} from "./redux/store";
function App() {
    return (

            <BrowserRouter>
                <Provider store={store}>
                <AuthProvider>
                    <CartProvider>
                        <Routes>
                            <Route path="/home" element={<MainPage/>}/>
                            <Route path="/" element={<LandingPage/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/cart" element={
                                <ProtectedRoute>
                                    <CartPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/account" element={
                                <ProtectedRoute>
                                    <AccountPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path={"/products/:id"} element={<ProductPage/>}/>

                        </Routes>
                    </CartProvider>
                </AuthProvider>
                </Provider>
            </BrowserRouter>

    );


}

export const ProtectedRoute = ({children}) => {
    const {authKey} = useAuth();
    if (!authKey) {
        return <Navigate to="/login"/>;
    }
    return children;
};

export default App;
