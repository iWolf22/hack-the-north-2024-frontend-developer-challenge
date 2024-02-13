import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar";
import EventsPage from './EventsPage';
import axios from 'axios';
import Container from '@mui/material/Container';
import sortingAlg from './SortingAlg';

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

export default function App() {

	var [ result, setResult ] = useState< TEvent[] >([]);
	var [ sorting, setSorting ] = useState("Sort: Date Ascending");
	var [ filter, setFilter ] = useState("Filter: All");

	useEffect(() => {
		axios.get("https://api.hackthenorth.com/v3/events")
			.then((res) => {
				setResult(sortingAlg(res.data, 1));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	var stringList = ['Sort: Date Ascending', 'Sort: Date Descending', 'Sort: Alphabetical A-Z', 'Sort: Alphabetical Z-A', 'Filter: All', 'Filter: Public', 'Filter: Private', 'Filter: Tech Talk', 'Filter: Workshop', 'Filter: Activity'];
	function updateEventList( sortBy: number ) {
		console.log(stringList[sortBy - 1]);
		if (sortBy <= 4) {
			setSorting(stringList[sortBy - 1]);
			setResult(sortingAlg(result, sortBy));
		} else {
			setFilter(stringList[sortBy - 1]);
		}
	}
	
	return (
		<div>
			<Container maxWidth="lg">
				<Navbar />
				<Routes>
					<Route path="/" element={<div><h1>Hackathon Home Page</h1></div>}></Route>
					<Route path="/events" element={
						<EventsPage
							eventList={result}
							updateEventList={updateEventList}
							sorting={sorting}
							filter={filter} />
					}></Route>
					<Route path="/login" element={<div><h1>Login</h1></div>}></Route>
				</Routes>
			</Container>
		</div>
	);
}
