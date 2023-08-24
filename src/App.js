import './App.css';
import {CartProvider} from "./Components/Utils";
import {
    FiltersSection,
    getItems,
    LoadMoreComponent,
    MainPage,
    Pagination,
    Products
} from "./Components/shop_page/ShopPage";
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
import {AuthProvider, Login, useAuth} from "./Components/login_page/Login";
import {LandingPage} from "./Components/landing_page/LandingPage";
import {CartPage} from "./Components/cart_page/CartPage";
import {AccountPage} from "./Components/account_page/AccountPage";
import {ProductPage} from "./Components/product_page/ProductPage";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {Register} from "./Components/register_page/Register";

function App() {
    return (

        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <CartProvider>
                        <Routes>
                            <Route path="/shop" element={<MainPage/>}/>
                            <Route path="/" element={<LandingPage/>}/>

                            <Route path="/login" element={
                                <ProtectedRouteIfLoggedIn>
                                    <Login/>
                                </ProtectedRouteIfLoggedIn>}/>
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

                            <Route path="/register" element={
                                <ProtectedRouteIfLoggedIn>
                                    <Register/>
                                </ProtectedRouteIfLoggedIn>}/>


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
export const ProtectedRouteIfLoggedIn = ({children}) => {
    const {authKey} = useAuth();
    if (authKey) {
        return <Navigate to="/shop"/>;
    }
    return children;
}

export default App;
