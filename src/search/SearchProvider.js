import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from 'network/NetworkProvider';

export const SearchContext = createContext();

export const searchReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    
    var newstate={...state}
        if (data.hasOwnProperty('previous')) {
            newstate={...newstate, previousPicks: data.previous}
        }
        if (data.hasOwnProperty("searchResults")) {
            newstate={...newstate, searchResults: data.searchResults}  
        }
    return newstate
}


export default function SearchProvider(props) {
    
    const initialState={ "previousPicks": {}, "searchResults": [] }
    
    const [ searchData, searchDispatch] = useReducer(searchReducer, initialState);
    const { getJSON, addSubscriber } = useContext(NetworkContext);
    const [ searchText, setSearchText ]=useState('')
    const [ searchType, setSearchType ]=useState('popular')

    useEffect(() => {
       addSubscriber(searchDispatch)
    // eslint-disable-next-line 
    }, []);

    function search(text) {
        setSearchText(text)
        if (text.length<3) {
            searchDispatch({"searchResults": []})
        } else {
            getJSON('search/'+text).then(result=>searchDispatch({"searchResults": result }))
        }
    };  

    return (
        <SearchContext.Provider
            value={{
                searchResults: searchData.searchResults,
                searchText: searchText,
                setSearchText: setSearchText,
                search: search,

                searchType: searchType,
                setSearchType: setSearchType,
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
}
    
