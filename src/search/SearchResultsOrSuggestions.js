import React, { useContext } from 'react';
import { SearchContext } from 'search/SearchProvider';
import SearchResults from 'search/SearchResults'
import PreviousPicks from 'search/PreviousPicks'

export default function SearchResultsOrSuggestions(props) {

    const { searchResults } = useContext(SearchContext);

    return ( searchResults.length ?
            <SearchResults />
        :
            <PreviousPicks />
    )
    
}
