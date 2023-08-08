import logo from './logo.svg';
import './App.css';
import {Header, Notification} from "./Components/Header";
import {Button, useFetchProducts} from "./Components/Utils";
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
    },
    {
        path: "/login",
        loader: () => ({message: "Hello Data Router!"}),
        Component() {
            return <Login/>;
        }
    }
]);


function App() {
    // return <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>;
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/home" element={<MainPage/> }/>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <h1>Cart</h1>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </AuthProvider>
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
