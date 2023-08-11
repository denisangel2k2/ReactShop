import {useEffect, useState} from "react";

export function SearchBar({searchText, setSearchText}) {
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
