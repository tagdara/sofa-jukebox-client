import React, { useContext } from 'react';
import { SearchContext } from 'search/SearchProvider';
import SearchResults from 'search/SearchResults'
import PopularPicks from 'search/PopularPicks'
import RecentPicks from 'search/RecentPicks'
import UserPicks from 'search/UserPicks'

export default function SearchResultsOrSuggestions(props) {

    const { searchType, searchText, searchResults } = useContext(SearchContext);

    return ( (searchText.length || searchResults.length) ?
            <SearchResults />
        :
            <>
                { searchType == "popular" && <PopularPicks /> }
                { searchType == "recent" && <RecentPicks /> }
                { searchType == "user" && <UserPicks /> }
            </>
    )
    
}
