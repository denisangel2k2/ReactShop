import {Product} from "./Utils";

export function Main({products,isNotificationVisible,setIsNotificationVisible}){
    return (
        <main>
            <FiltersSection/>
            <Products products={products} isNotificationVisible={isNotificationVisible} setIsNotificationVisible={setIsNotificationVisible}/>
        </main>
    );
}
function FiltersSection(){
    return (
        <div className="filter-wrapper">
            <div className="filter-section">
                <p>Categories:</p>
            </div>
        </div>
        );

}
function Products({products,isNotificationVisible,setIsNotificationVisible}){
    const productElements = products.map((product) => {
        return (
            <Product key={product.id} jsonItem={product} isNotificationVisible={isNotificationVisible} setIsNotificationVisible={setIsNotificationVisible}/>
        );
    });
    return (
        <div className="shop-items">
            {productElements}
        </div>
    );
}