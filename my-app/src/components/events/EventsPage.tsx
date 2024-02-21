/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import InputField from '../other/InputField';
import ScrollToTop from '../other/ScrollToTop';
import EventsCard from './EventsCard';
import EventsDropDown from './EventsDropDown';
import ChipGenerator from './ChipGenerator';
import FilterAndSearch from './FilterAndSearch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

// MaterialUI dark theme
var darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
}); 

/**
 * Generates the events page
 *
 * @param eventList - list of the events and their information
 * @param updateEventList - function to update the "filter" or "sorting" states
 * @param sorting - state variable regarding how the "eventList" should be sorted
 * @param filter - state variable regarding how the "eventList" should be filtered
 * @param updateSearch - function to update the "search" state which holds what event the user is searching for
 * @param search - string containing what events the users are searching for
 * @param color - the color theme, "light" or "dark"
 * @param login - boolean regarding if the user has logged in
 * @return JSX Element
 */
export default function EventsPage( props: { eventList: TEvent[], updateEventList: Function, sorting: string, filter: string, search: string, updateSearch: Function, color: string, login: boolean } ) {

	// Saves the "filteredList" as the filtered and searched "eventList"
	var filteredList = FilterAndSearch(props.eventList, props.filter, props.search, props.login);

	// When the value in the event search input field changes, updates the "search" state to it
	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		props.updateSearch(event.currentTarget.value);
	}

	return (
		<Container sx={{ py: 16 }}>

			{/* Scrolls to the top when switching tabs */}
			<ScrollToTop />
			<div style={{display: 'flex', justifyContent: 'space-between'}}>

				{/* Events page header text */}
				<Typography component='h2' variant='h4' sx={{ fontFamily: 'JetBrains Mono, monospace' }} color={props.color === 'light' ? 'black' : 'white'}>
					Hackathon Global Inc.™ Events
				</Typography>

				{/* Chips with special info sorting and filter status */}
				<div style={{display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '10px', justifyContent: 'right' }}>
					<ChipGenerator color={props.color} chipType={props.sorting} />
					<ChipGenerator color={props.color} chipType={props.filter} />
				</div>
			</div>

			{/* Custom input field and events drop down menu */}
			<div style={{display: 'flex', gap: '10px', marginBottom: '40px'}}>
				<InputField handleChange={handleChange} color={props.color} title='Search for an Event' content={props.search} />
				<EventsDropDown updateEventList={props.updateEventList} color={props.color} />
			</div>

			{/* Grid containing all the event cards */}
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 4, md: 8, lg: 12 }}>
				{filteredList.map((event, index) => {
					return (
						<Grid item xs={2} sm={4} md={4} key={index}>

							{/* Individual event card */}
							<EventsCard
								key={index}
								eventInfo={event}
								color={props.color}
							/>
						</Grid>
					);
				})}

				{/* If there are no events given the filter/search criteria then show an error message */}
				{filteredList.length === 0
				&& <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px'}}>
					{props.color === 'light'
					? <Alert severity='error'>No results found!</Alert>
					: <ThemeProvider theme={darkTheme}>
						<Alert severity='error'>No results found!</Alert>
					</ThemeProvider>}
				</div>}
			</Grid>
		</Container>
	);
}
