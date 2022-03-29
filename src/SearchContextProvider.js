import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();
const FilterSearchContext = createContext();

export const useSearch = () => {
    return useContext(SearchContext); 
}

export const useFilterSearch = () => {
    return useContext(FilterSearchContext); 
}

export const SearchContextProvider = ({children}) => {
    const [search, setSearch] = useState(false);
    const [filterText, setFilterText] = useState("");

    return (
        <SearchContext.Provider value={[search, setSearch]}>
            <FilterSearchContext.Provider value={[filterText, setFilterText]}>
                {children}
            </FilterSearchContext.Provider>
        </SearchContext.Provider>
    );
}