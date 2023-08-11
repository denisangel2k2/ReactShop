import {CategoryDropdown} from "./CategoryDropdown";
import {SearchBar} from "./SearchBar";

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




