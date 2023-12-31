
import {useEffect, useState} from "react";
import {Header, Notification} from "../header/Header";
import {useDispatch, useSelector} from "react-redux";
import {setProds} from "../../redux/slices/products";
import {useAuth} from "../login_page/Login";
import {useGetProductsForCategoryQuery} from "../../redux/apis";
import {Navbar} from "../header/navbar/Navbar";
import {Pagination} from "./Pagination";
import {Products} from "./Products";
import {FiltersSection} from "./FilterSection";
import {LoadingProducts} from "../Loading";
import {BuyNotification} from "./BuyNotification";

export function MainPage() {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {authKey} = useAuth();


    const {
        data: prods,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetProductsForCategoryQuery([selectedCategory, (currentPage - 1) * itemsPerPage, itemsPerPage, searchText]);

    useEffect(() => {
        if (prods) {
            dispatch(setProds(prods));
            setFilteredProducts(prods);
        }
    }, [prods]);


    return (
        <div id="app">
            <Navbar isNotificationVisible={isNotificationVisible} setIsNotificationVisible={setIsNotificationVisible}/>
            <main>
                <FiltersSection
                    setSearchText={setSearchText}
                    setSelectedCategory={setSelectedCategory}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    searchText={searchText}
                />
                {(isLoading || isFetching) ? <LoadingProducts/> :
                    <Products
                        products={filteredProducts}
                        isNotificationVisible={isNotificationVisible}
                        setIsNotificationVisible={setIsNotificationVisible}/>
                }
                {/*<BuyNotification/>*/}
            </main>

            />
            <Pagination
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                selectedCategory={selectedCategory}
                searchText={searchText}
            />


        </div>
    );
}