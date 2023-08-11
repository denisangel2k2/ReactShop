import {useEffect} from "react";

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