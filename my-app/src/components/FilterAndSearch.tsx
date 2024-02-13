import React from 'react';

// The information for an event will look like so
// Each event will belong to one of the following types
export type TEvent = {
    id: number;
    name: string;
    event_type: "workshop" | "activity" | "tech_talk";
    permission?: "public" | "private";

    start_time: number; // unix timestamp (ms)
    end_time: number; // unix timestamp (ms)

    description?: string; // a paragraph describing the event
    speakers: { name: string }[]; // a list of speakers for the event

    public_url?: string; // a url to display for the general public
    private_url: string; // a url to display for hackers
    related_events: number[]; // a list ids corresponding to related events
};

function searchFunction( eventList: TEvent[], search: string ) {
    var newList: TEvent[] = [];
    for (let i = 0; i < eventList.length; i++) {
        if ((eventList[i].name.toLowerCase()).includes(search.toLowerCase())) {
            newList.push(eventList[i]);
        }
    }
    return newList;
}

export default function FilterAndSearch( eventList: TEvent[], filter: string, search: string ) {
    var filterList = [['Filter: Public', 'public'], ['Filter: Private', 'private'], ['Filter: Tech Talk', 'tech_talk'], ['Filter: Workshop', 'workshop'], ['Filter: Activity', 'activity']];
    var newList: TEvent[] = [];
    if (filter === 'Filter: All') {
        return searchFunction(eventList, search);
    }
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
    return searchFunction(newList, search);
}