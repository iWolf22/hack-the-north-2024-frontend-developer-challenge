/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// The information for an event will look like so
// Each event will belong to one of the following types
export type TEvent = {
    id: number;
    name: string;
    event_type: 'workshop' | 'activity' | 'tech_talk';
    permission?: 'public' | 'private';

    start_time: number; // unix timestamp (ms)
    end_time: number; // unix timestamp (ms)

    description?: string; // a paragraph describing the event
    speakers: { name: string }[]; // a list of speakers for the event

    public_url?: string; // a url to display for the general public
    private_url: string; // a url to display for hackers
    related_events: number[]; // a list ids corresponding to related events
};

// Function that only returns list items with a subset of the search string in their titles
function searchFunction( eventList: TEvent[], search: string ) {
    var newList: TEvent[] = [];
    for (let i = 0; i < eventList.length; i++) {
        if ((eventList[i].name.toLowerCase()).includes(search.toLowerCase())) {
            newList.push(eventList[i]);
        }
    }
    return newList;
}

// Function that removes all private events
function loginFilter( eventList: TEvent[], login: boolean ) {
    var newList: TEvent[] = [];
    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].permission === 'public') {
            newList.push(eventList[i]);
        }
    }
    return newList;
}

/**
 * Filters and searches through the inputted list
 *
 * @param eventList - list of the events and their information
 * @param filter - state variable regarding how the "eventList" should be filtered
 * @param login - boolean regarding if the user has logged in
 * @param search - string containing what events the users are searching for
 * @return JSX Element
 */
export default function FilterAndSearch( eventList: TEvent[], filter: string, search: string, login: boolean ) {

    // List that connects string names
    var filterList = [
        ['Filter: Public', 'public'],
        ['Filter: Private', 'private'],
        ['Filter: Tech Talk', 'tech_talk'],
        ['Filter: Workshop', 'workshop'],
        ['Filter: Activity', 'activity']
    ];
    
    // If you haven't logged in, remove private events
    if (login === false) {
        eventList = loginFilter(eventList, login); 
    }

    // If you don't need to filter anything, search through "eventList" and return it
    if (filter === 'Filter: All') {
        return searchFunction(eventList, search);
    }

    // Only saves the event item if it meets the filter requirements
    var newList: TEvent[] = [];
    for (let i = 0; i < eventList.length; i++) {
        for (let j = 0; j < filterList.length; j++) {
            if (eventList[i].permission === filterList[j][1] && filterList[j][0] === filter) {
                newList.push(eventList[i]);
            }
            if (eventList[i].event_type === filterList[j][1] && filterList[j][0] === filter) {
                newList.push(eventList[i]);
            }
        }
    }

    // Searches through "eventList" and returns it
    return searchFunction(newList, search);
}