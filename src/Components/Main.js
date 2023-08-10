import {Button, CartProvider, Product, useFetchProducts} from "./Utils";
import {useEffect, useState} from "react";
import {Header, Notification} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {setProds} from "../redux/slices/products";
import {useAuth} from "./Login";


export function FiltersSection({setApi, searchText, setSearchText, setSelectedCategory, setCurrentPage, itemsPerPage}) {
    return (
        <div className="filter-wrapper">
            <div className="filter-section">
                <p>Categories:</p>
                <SearchBar setSearchText={setSearchText} searchText={searchText}/>
                <CategoryDropdown setApi={setApi} setSelectedCategory={setSelectedCategory}
                                  setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage}/>
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


function CategoryDropdown({setApi, setSelectedCategory, itemsPerPage, setCurrentPage}) {
    const categories = [
        "smartphones", "laptops", "fragrances", "skincare", "groceries",
        "home-decoration", "furniture", "tops", "womens-dresses",
        "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches",
        "womens-watches", "womens-bags", "womens-jewellery",
        "sunglasses", "automotive", "motorcycle", "lighting"
    ];

    // const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    function handleChange(event) {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        //TODO: add categories to local storage

        if (newCategory === '') {
            if (!localStorage.getItem("products"))
                setApi(`https://dummyjson.com/products/?limit=100`);
            else dispatch(setProds(JSON.parse(localStorage.getItem("products"))));
            document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(100 / itemsPerPage)}`;
        } else {
            setApi(`https://dummyjson.com/products/category/${newCategory}/?limit=${itemsPerPage}`);
            document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(5 / itemsPerPage)}`;
        }
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
    if (!products) {
        return <div>Loading...</div>;
    }

    console.log(products)
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

async function getProductsForCategory(category, skip, itemsPerPage, authKey) {
    let api;
    if (category === '')
        api = `https://dummyjson.com/products/?limit=${itemsPerPage}&skip=${skip}`;
    else api = `https://dummyjson.com/products/category/${category}?limit=${itemsPerPage}&skip=${skip}`;

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': authKey

                },
            });

            if (response.ok) {
                return response.json();
            } else if (response.status === 429) {
                retryCount++;
                console.log(`Retrying after ${retryCount} attempt(s) due to 429 error...`);
                await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount)); // Wait for increasing delay
            } else {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    throw new Error(`Failed to fetch data after ${maxRetries} attempts.`);
}

export async function getItems(api) {
    const response = await fetch(api);
    const items = await response.json();
    return items.products;
}


function getProductsFromPageArray(currentPage, itemsPerPage, selectedCategory, products) {
    console.log(currentPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let filteredProducts;
    if (selectedCategory === '')
        filteredProducts = products;
    else
        filteredProducts = products.filter(product => product.category === selectedCategory);

    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    return pageProducts;
}

export function Pagination({
                               itemsPerPage,
                               setItemsPerPage,
                               currentPage,
                               setCurrentPage,
                               selectedCategory
                           }) {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {authKey} = useAuth();
    useEffect(() => {
        getProductsForCategory(selectedCategory, (currentPage - 1) * itemsPerPage, itemsPerPage, authKey).then((json) => {
            document.querySelector(".current-page").value = currentPage;
            dispatch(setProds(json.products));
            if (selectedCategory === '')
                document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(100 / itemsPerPage)}`;
            else
                document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(5 / itemsPerPage)}`;
        });


    }, [itemsPerPage, currentPage])

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
                        <input className={"current-page"} type="number" defaultValue={1}
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
    const [api, setApi] = useState(`https://dummyjson.com/products/?limit=${itemsPerPage}`);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const products = useSelector(state => state.products);

    const dispatch = useDispatch();
    useFetchProducts(api);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                let searchedProducts;
                if (!localStorage.getItem('products'))
                    searchedProducts = await getItems(`https://dummyjson.com/products?limit=${itemsPerPage}`);
                else searchedProducts = JSON.parse(localStorage.getItem('products'));

                let updatedProducts = searchedProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
                let index = searchedProducts.findIndex(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
                const itemFoundOnPage = Math.floor(index / itemsPerPage) + 1;

                if (isMounted) {
                    dispatch(setProds(updatedProducts));
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
                />
                <Products
                    products={products}
                    isNotificationVisible={isNotificationVisible}
                    setIsNotificationVisible={setIsNotificationVisible}/>
            </main>

            />
            <Pagination
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                selectedCategory={selectedCategory}
            />

        </div>
    );
}