import React, { useState } from 'react';
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

	axios.get("https://api.hackthenorth.com/v3/events")
		.then((res) => {
			setResult(sortingAlg(res.data, "date ascending")); //"date ascending"
		})
		.catch((err) => {
			console.log(err);
		});
	
	return (
		<div>
			<Container maxWidth="lg">
				<Navbar />
				<Routes>
					<Route path="/" element={<div><h1>Hackathon Home Page</h1></div>}></Route>
					<Route path="/events" element={<EventsPage eventList={result} />}></Route>
					<Route path="/login" element={<div><h1>Login</h1></div>}></Route>
				</Routes>
			</Container>
		</div>
	);
}
