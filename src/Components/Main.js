import {Button, Product} from "./Utils";
import {useEffect, useState} from "react";


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

function SearchBar({searchText,setSearchText}) {

    useEffect(()=>{
        const delay=1000;
        const timeoutId=setTimeout(()=>{
            console.log(searchText);
        },delay);

        return ()=>clearTimeout(timeoutId);
    },[searchText]);
    function handleSearch(event) {
        const text = event.target.value;
        setSearchText(text);
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" onChange={handleSearch}/>
        </div>
    );
}

async function getProductsFromPage(page, itemsPerPage, category) {
    let api;
    if (category === '') {
        api = `https://dummyjson.com/products/?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;
    } else {
        api = `https://dummyjson.com/products/category/${category}?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;
    }

    const responseItems = await getItems(api);
    return responseItems;
}

function CategoryDropdown({setApi, setSelectedCategory, itemsPerPage, setCurrentPage}) {
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
        //TODO: add categories to local storage
        if (newCategory === '')
            setApi(`https://dummyjson.com/products/?limit=${itemsPerPage}`);
        else
            setApi(`https://dummyjson.com/products/category/${newCategory}/?limit=${itemsPerPage}`);

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

async function getProductsForCategory(category, skip) {
    //test if products are stored in local storage
    //if not, fetch them from the api
    //otherwise, get them from local storage
    //apply a filter function so that the category is the same as the one selected

    return await fetch(`https://dummyjson.com/products/category/${category}?limit=3&skip=${skip}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => {
            return res.json();
        });

}

export async function getItems(api) {
    const response = await fetch(api);
    const items = await response.json();
    return items.products;
}

export function LoadMoreComponent({selectedCategory, setProducts, products, currentSkip, setCurrentSkip, setApi}) {
    async function loadMoreProducts() {

        if (selectedCategory !== '')
            getProductsForCategory(selectedCategory, currentSkip).then(data => {
                setProducts([...products, ...data.products]);
                setCurrentSkip(currentSkip + 3);
            });
        else {
            getItems(`https://dummyjson.com/products/?limit=3&skip=${currentSkip}`).then(data => {
                setProducts([...products, ...data]);
                setCurrentSkip(currentSkip + 3);
            });
        }


    }

    return (
        <div className="pagination-controls">
            <Button className={'load-more-btn'} onClick={loadMoreProducts} text={'Load more'}/>
        </div>
    );
}

export function Pagination({
                               products,
                               setProducts,
                               itemsPerPage,
                               setItemsPerPage,
                               currentPage,
                               setCurrentPage,
                               selectedCategory
                           }) {

    useEffect(() => {
        getProductsFromPage(currentPage, itemsPerPage, selectedCategory).then(
            data => {
                setProducts(data)
                document.querySelector(".current-page").value = currentPage;
                console.log(products.length);
                if (selectedCategory === '')
                    document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(100 / itemsPerPage)}`;
                else
                    document.querySelector(".pages-count").innerHTML = ` / ${Math.ceil(5 / itemsPerPage)}`;
            }
        );
    }, [itemsPerPage, currentPage])

    function handleNextPage() {
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