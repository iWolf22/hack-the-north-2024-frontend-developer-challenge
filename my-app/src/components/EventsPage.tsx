import React from 'react';
import Events from './EventsCard';
import EventsDropDown from './EventsDropDown';
import ChipGenerator from './ChipGenerator';
import FilterAndSearch from './FilterAndSearch';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

export default function EventsPage( props: { eventList: TEvent[], updateEventList: Function, sorting: string, filter: string, search: string, updateSearch: Function } ) {


	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newValue = event.currentTarget.value;
		props.updateSearch(newValue);
	}

	return (
		<div>
			<h1 className="test">Events</h1>
			<div style={{display: "flex", gap: "10px"}}>
				<TextField onChange={handleChange} fullWidth label="Events Search" />
				<EventsDropDown updateEventList={props.updateEventList} />
			</div>
			<div style={{display: "flex", gap: "10px"}}>
				<ChipGenerator chipType={props.sorting} />
				<ChipGenerator chipType={props.filter} />
			</div>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 4, md: 8, lg: 12 }}>
				{FilterAndSearch(props.eventList, props.filter, props.search).map((event, index) => {
					return (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<Events
								key={index}
								eventInfo={event}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}
