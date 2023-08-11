import {Button, CartProvider, Product, useFetchProducts} from "./Utils";
import {useEffect, useState} from "react";
import {Header, Notification} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {setProds} from "../redux/slices/products";
import {useAuth} from "./Login";
import {useGetProductsForCategoryQuery} from "../redux/apis";


export function FiltersSection({searchText, setSearchText, setSelectedCategory, setCurrentPage, itemsPerPage}) {
    return (
        <div className="filter-wrapper">
            <div className="filter-section">
                <p>Categories:</p>
                <SearchBar setSearchText={setSearchText} searchText={searchText}/>
                <CategoryDropdown setSelectedCategory={setSelectedCategory}
                                  setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );

}

function SearchBar({searchText, setSearchText}) {
    const [inputValue, setInputValue] = useState(searchText);

    useEffect(() => {
        const delay = 1000;
        const timeoutId = setTimeout(() => {
            setSearchText(inputValue);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [inputValue, setSearchText]);

    function handleSearch(event) {
        const text = event.target.value;
        setInputValue(text);
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" value={inputValue} onChange={handleSearch}/>
        </div>
    );
}


function CategoryDropdown({setSelectedCategory, setCurrentPage}) {
    const categories = [
        "smartphones", "laptops", "fragrances", "skincare", "groceries",
        "home-decoration", "furniture", "tops", "womens-dresses",
        "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches",
        "womens-watches", "womens-bags", "womens-jewellery",
        "sunglasses", "automotive", "motorcycle", "lighting"
    ];

    function handleChange(event) {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        setCurrentPage(1);
    }

    return (
        <>
            <select name="category" id="category" onChange={handleChange}>
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category}
                            value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                ))}
            </select>
        </>
    );

}

export function Products({products, isNotificationVisible, setIsNotificationVisible}) {

    const productElements = products.map((product) => {
        return (
            <Product key={product.id} jsonItem={product} isNotificationVisible={isNotificationVisible}
                     setIsNotificationVisible={setIsNotificationVisible}/>
        );
    });

    return (
        <div className="shop-items">
            {productElements}
        </div>
    );
}


export function Pagination({
                               itemsPerPage,
                               setItemsPerPage,
                               currentPage,
                               setCurrentPage,
                               selectedCategory
                           }) {

    useEffect(() => {
        if (selectedCategory === '')
            document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(100 / itemsPerPage)}`;
        else
            document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(5 / itemsPerPage)}`;


    }, [itemsPerPage, currentPage,selectedCategory])

    function handleNextPage() {
        const maxPage = selectedCategory === '' ? Math.ceil(100 / itemsPerPage) : Math.ceil(5 / itemsPerPage);
        if (currentPage < maxPage)
            setCurrentPage(currentPage + 1);
    }

    function handlePreviousPage() {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
    }


    return (
        <div className="pagination-controls">
            <div className="pagination">
                <div className="pagination-btn">
                    <i id="previous-page" className="fa-solid fa-chevron-left" onClick={handlePreviousPage}></i>
                    <span className={"pagination-keys"}>
                        <input className={"current-page"} type="number" value={currentPage}
                               onChange={(e) => setCurrentPage(Number(e.target.value))}/>
                        <span className={"pages-count"}> / 25</span>
                    </span>
                    <i id="next-page" className="fa-solid fa-chevron-right" onClick={handleNextPage}></i>
                    <select name="items-per-page" id="items-per-page" defaultValue={"5"}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>
    );
}


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
    } = useGetProductsForCategoryQuery([selectedCategory, (currentPage - 1) * itemsPerPage, itemsPerPage, authKey]);


    useEffect(() => {
        if (prods) {
            console.log(selectedCategory, currentPage);
            dispatch(setProds(prods["products"]));
            setFilteredProducts(prods["products"]);

        }
    }, [prods]);


    useEffect(() => {
        let filteredProductsSearch = products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredProducts(filteredProductsSearch);
    }, [searchText])

    return (
        <div id="app">
            <Notification isNotificationVisible={isNotificationVisible}
                          setIsNotificationVisible={setIsNotificationVisible}
                          message="Added to cart"/>
            <Header/>
            <main>
                <FiltersSection
                    setSearchText={setSearchText}
                    setSelectedCategory={setSelectedCategory}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    searchText={searchText}
                />
                {(isLoading || isFetching) ? <div className="loading"><br/><br/><br/><br/><br/><br/><br/><br/><br/>Loading...</div> :
                    <Products
                        products={filteredProducts}
                        isNotificationVisible={isNotificationVisible}
                        setIsNotificationVisible={setIsNotificationVisible}/>
                }
            </main>

            />
            <Pagination
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                selectedCategory={selectedCategory}/>


        </div>
    )
        ;
}