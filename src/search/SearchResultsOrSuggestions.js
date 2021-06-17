import React, { useContext, useState } from 'react';
import { SearchContext } from 'search/SearchProvider';
import SearchResults from 'search/SearchResults'
import SearchResultPopup from 'search/SearchResultPopup'
import PopularPicks from 'search/PopularPicks'
import RecentPicks from 'search/RecentPicks'
import UserPicks from 'search/UserPicks'

export default function SearchResultsOrSuggestions(props) {

    const { searchType, searchText, searchResults } = useContext(SearchContext);
    const [ popTrack, setPopTrack ] = useState(undefined)

    function closePopup() {
        setPopTrack(undefined)
    }

    function popup(song) {
        setPopTrack(song)
    }

    return ( 
        <>
        { (searchText.length || searchResults.length) ?
            <SearchResults popup={popup} />
        :
            <>
                { searchType === "popular" && <PopularPicks popup={popup} /> }
                { searchType === "recent" && <RecentPicks popup={popup} /> }
                { searchType === "user" && <UserPicks popup={popup} /> }
            </>
        }
        { popTrack &&
            <SearchResultPopup track={popTrack} open={popTrack !== undefined } close={closePopup} />
        }
        </>
    )
    
}
