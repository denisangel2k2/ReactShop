import {Product} from "./Utils";
import {useEffect, useState} from "react";

export function Main({products, setProducts, setApi, isNotificationVisible, setIsNotificationVisible}) {
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [originalProducts, setOriginalProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        setOriginalProducts(products);
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        let updatedProducts = originalProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredProducts(updatedProducts);
    }, [originalProducts, searchText, selectedCategory]);

    return (
        <main>
            <FiltersSection setApi={setApi} setSearchText={setSearchText}
                            setSelectedCategory={setSelectedCategory}/>
            <Products products={filteredProducts} isNotificationVisible={isNotificationVisible}
                      setIsNotificationVisible={setIsNotificationVisible}/>
        </main>
    );
}

function FiltersSection({setApi, setSearchText, setSelectedCategory}) {
    return (
        <div className="filter-wrapper">
            <div className="filter-section">
                <p>Categories:</p>
                <SearchBar setSearchText={setSearchText}/>
                <CategoryDropdown setApi={setApi} setSelectedCategory={setSelectedCategory}/>
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

function CategoryDropdown({setApi, setSelectedCategory}) {
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
        if (newCategory === '')
            setApi('https://dummyjson.com/products/?limit=10');
        else
            setApi(`https://dummyjson.com/products/category/${newCategory}/?limit=10`);
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


function Products({products, isNotificationVisible, setIsNotificationVisible}) {
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