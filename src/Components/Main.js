import {Button, Product} from "./Utils";
import {useEffect, useState} from "react";


export function FiltersSection({setApi, setSearchText, setSelectedCategory,setCurrentSkip}) {
    return (
        <div className="filter-wrapper">
            <div className="filter-section">
                <p>Categories:</p>
                <SearchBar setSearchText={setSearchText}/>
                <CategoryDropdown setApi={setApi} setSelectedCategory={setSelectedCategory} setCurrentSkip={setCurrentSkip}/>
            </div>
        </div>
    );

}

function SearchBar({setSearchText}) {

    // useEffect(()=>{
    //     const delay=1000;
    //     const timeoutId=setTimeout(()=>{
    //         console.log(searchText);
    //     },delay);
    //
    //     return ()=>clearTimeout(timeoutId);
    // },[searchText]);
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

function CategoryDropdown({setApi, setSelectedCategory,setCurrentSkip}) {
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
            setApi('https://dummyjson.com/products/?limit=3');
        else
            setApi(`https://dummyjson.com/products/category/${newCategory}/?limit=3`);
        setCurrentSkip(3);
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
async function getProductsForCategory(category,skip) {
    return await fetch(`https://dummyjson.com/products/category/${category}?limit=3&skip=${skip}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => {
            return res.json();
        });

}
async function getItems(api) {
    const response = await fetch(api);
    const items = await response.json();
    return items.products;
}
export function LoadMoreComponent({selectedCategory,setProducts,products,currentSkip,setCurrentSkip,setApi}) {
    async function loadMoreProducts(){

        if (selectedCategory !== '')
            getProductsForCategory(selectedCategory,currentSkip).then(data=>{
                setProducts([...products,...data.products]);
                setCurrentSkip(currentSkip+3);
            });
        else{
            getItems(`https://dummyjson.com/products/?limit=3&skip=${currentSkip}`).then(data=>{
                setProducts([...products,...data]);
                setCurrentSkip(currentSkip+3);
            });
        }


    }

    return (
        <div className="pagination-controls">
            <Button className={'load-more-btn'} onClick={loadMoreProducts} text={'Load more'}/>
        </div>
    );
}