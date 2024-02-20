import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import EventsPage from './components/events/EventsPage';
import axios from 'axios';
import Container from '@mui/material/Container';
import sortingAlg from './components/other/SortingAlg';
import Login from './components/login/Login';
import EventPage from './components/events/SingleEventPage';
import Typography from '@mui/material/Typography';
import Footer from './components/footer/Footer';

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
	var [ search, setSearch ] = useState("");
	var [ color, setColor ] = useState("dark");
	var [ login, setLogin ] = useState(false);
	var [ prevLogin, setPrevLogin ] = useState("null");

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
		if (sortBy <= 4) {
			setSorting(stringList[sortBy - 1]);
			setResult(sortingAlg(result, sortBy));
		} else {
			setFilter(stringList[sortBy - 1]);
		}
	}

	function updateSearch( newValue: string ) {
		setSearch(newValue);
	}

	function userLogin( username: string, password: string ) {
		if (username === 'I <3' && password === "HackTheNorth") {
			setLogin(true);
			setPrevLogin("success");
		} else {
			setPrevLogin("fail");
		}
		console.log(login, prevLogin);
	}

	var htmlElement = document.getElementById("html-element");
	if (htmlElement !== null) {
		htmlElement.classList.add("dark-html");
	}
	function updateColor() {
		if (color === "light") {
			setColor("dark");
			if (htmlElement !== null) {
				htmlElement.classList.remove("light-html");
				htmlElement.classList.add("dark-html");
			}
		} else {
			setColor("light");
			if (htmlElement !== null) {
				htmlElement.classList.remove("dark-html");
				htmlElement.classList.add("light-html");
			}
		}
	}
	
	return (
		<div id="page-container">
			<Container maxWidth="lg">
				<Navbar color={color} updateColor={updateColor} />
				<Routes>
					<Route path="/" element={<Home color={color} />}></Route>
					<Route path="/events" element={
						<EventsPage
							eventList={result}
							updateEventList={updateEventList}
							sorting={sorting}
							search={search}
							updateSearch={updateSearch}
							color={color}
							login={login}
							filter={filter} />
					}></Route>
					<Route path="/login" element={<Login color={color} userLogin={userLogin} login={login} prevLogin={prevLogin} />}></Route>
					{result.map((event, index) => {
						return (
							<Route path={"/" + event.name.replace(/\W/g, '')} key={index} element={<EventPage eventList={result} eventNumber={index} key={index} color={color} login={login} />}></Route>
						);
					})}
				</Routes>
			</Container>
			<footer id="page-footer">
				<Footer color={color} />
			</footer>
		</div>
	);
}
