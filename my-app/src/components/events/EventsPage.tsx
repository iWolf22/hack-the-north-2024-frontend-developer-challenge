import React from 'react';
import InputField from '../other/InputField';
import EventsCard from './EventsCard';
import EventsDropDown from './EventsDropDown';
import ChipGenerator from './ChipGenerator';
import FilterAndSearch from './FilterAndSearch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScrollToTop from '../other/ScrollToTop';

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

const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
});

export default function EventsPage( props: { eventList: TEvent[], updateEventList: Function, sorting: string, filter: string, search: string, updateSearch: Function, color: string, login: boolean } ) {

	var filteredList = FilterAndSearch(props.eventList, props.filter, props.search, props.login);

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newValue = event.currentTarget.value;
		props.updateSearch(newValue);
	}

	return (
		<Container sx={{ py: 16 }}>
			<ScrollToTop />
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<Typography component="h2" variant="h4" sx={{ fontFamily: "JetBrains Mono, monospace" }} color={props.color === 'light' ? 'black' : 'white'}>
					Hackathon Global Inc.™ Events
				</Typography>
				<div style={{display: "flex", flexWrap: 'wrap', alignContent: 'flex-start', gap: "10px", justifyContent: "right" }}>
					<ChipGenerator color={props.color} chipType={props.sorting} />
					<ChipGenerator color={props.color} chipType={props.filter} />
				</div>
			</div>
			<div style={{display: "flex", gap: "10px", marginBottom: '40px'}}>
				<InputField handleChange={handleChange} color={props.color} title="Search for an Event" content={props.search} />
				<EventsDropDown updateEventList={props.updateEventList} color={props.color} />
			</div>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 4, md: 8, lg: 12 }}>
				{filteredList.map((event, index) => {
					return (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<EventsCard
								key={index}
								eventInfo={event}
								color={props.color}
							/>
						</Grid>
					);
				})}
				{filteredList.length === 0
				&& <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px'}}>
					{props.color === 'light'
					? <Alert severity="error">No results found!</Alert>
					: <ThemeProvider theme={darkTheme}>
						<Alert severity="error">No results found!</Alert>
					</ThemeProvider>}
				</div>}
			</Grid>
		</Container>
	);
}
