import React, { useContext, useState } from 'react';
import { SearchContext } from 'search/SearchProvider';
import SearchResults from 'search/SearchResults'
import SearchResultPopup from 'search/SearchResultPopup'
import RecentPicks from 'search/RecentPicks'
import UserPicks from 'search/UserPicks'
import SuggestionHeader from 'search/SuggestionHeader'

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
                <SuggestionHeader text={"Some of your previous choices"}/>
                <UserPicks popup={popup} />
                <SuggestionHeader text={"Other recent picks"}/>
                <RecentPicks popup={popup} filterUser={true} />
            </>
        }
        { popTrack &&
            <SearchResultPopup track={popTrack} open={popTrack !== undefined } close={closePopup} />
        }
        </>
    )
    
}
