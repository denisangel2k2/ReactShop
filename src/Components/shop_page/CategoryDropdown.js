export function CategoryDropdown({setSelectedCategory, setCurrentPage}) {
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