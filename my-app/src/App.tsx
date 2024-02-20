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

	var [ result, setResult ] = useState< TEvent[] >(getInitialResult);
	var [ sorting, setSorting ] = useState< string >(getInitialSorting);
	var [ filter, setFilter ] = useState< string >(getInitialFilter);
	var [ search, setSearch ] = useState< string >(getInitialSearch);
	var [ color, setColor ] = useState< string >(getInitialColor);
	var [ login, setLogin ] = useState< boolean >(getInitialLogin);
	var [ prevLogin, setPrevLogin ] = useState< string >(getInitialPrevLogin);

	function getInitialResult(): TEvent[]  {
		var data = window.localStorage.getItem('RESULT_REACT_STATE');
		return data === null ? [] : JSON.parse(data);
	}

	function getInitialSorting(): string  {
		var data = window.localStorage.getItem('SORTING_REACT_STATE');
		return data === null ? 'Sort: Date Ascending' : JSON.parse(data);
	}

	function getInitialFilter(): string  {
		var data = window.localStorage.getItem('FILTER_REACT_STATE');
		return data === null ? 'Filter: All' : JSON.parse(data);
	}

	function getInitialSearch(): string  {
		var data = window.localStorage.getItem('SEARCH_REACT_STATE');
		return data === null ? '' : JSON.parse(data);
	}

	function getInitialColor(): string  {
		var data = window.localStorage.getItem('COLOR_REACT_STATE');
		return data === null ? 'dark' : JSON.parse(data);
	}

	function getInitialLogin(): boolean  {
		var data = window.localStorage.getItem('LOGIN_REACT_STATE');
		return data === null ? false : JSON.parse(data);
	}

	function getInitialPrevLogin(): string  {
		var data = window.localStorage.getItem('PREVLOGIN_REACT_STATE');
		return data === null ? 'null' : JSON.parse(data);
	}

	useEffect(() => {
		window.localStorage.setItem('RESULT_REACT_STATE', JSON.stringify(result));
	}, [result]);

	useEffect(() => {
		window.localStorage.setItem('SORTING_REACT_STATE', JSON.stringify(sorting));
	}, [sorting]);

	useEffect(() => {
		window.localStorage.setItem('FILTER_REACT_STATE', JSON.stringify(filter));
	}, [filter]);

	useEffect(() => {
		window.localStorage.setItem('SEARCH_REACT_STATE', JSON.stringify(search));
	}, [search]);

	useEffect(() => {
		window.localStorage.setItem('COLOR_REACT_STATE', JSON.stringify(color));
	}, [color]);

	useEffect(() => {
		window.localStorage.setItem('LOGIN_REACT_STATE', JSON.stringify(login));
	}, [login]);

	useEffect(() => {
		window.localStorage.setItem('PREVLOGIN_REACT_STATE', JSON.stringify(prevLogin));
	}, [prevLogin]);

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

	function userLogout() {
		setLogin(false);
		setPrevLogin("null");
	}

	var htmlElement = document.getElementById("html-element");
	if (htmlElement !== null) {
		if (color === 'light') {
			htmlElement.classList.add('light-html');
		} else {
			htmlElement.classList.add('dark-html');
		}
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
				<Navbar color={color} userLogout={userLogout} login={login} updateColor={updateColor} />
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
