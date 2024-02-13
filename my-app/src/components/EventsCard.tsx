import React from 'react';
import ChipGenerator from './ChipGenerator';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

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

function dateConverter(time: number) {
    var date = new Date(time);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function timeConverter(time: number) {
    var date = new Date(time);
    return (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ':' + (JSON.stringify(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes()) + ' ' + (date.getHours() >= 12 ? 'pm' : 'am');
}

export default function EventsCard( props: { eventInfo: TEvent} ) {

    var description = props.eventInfo.description ?? '';
    var permission = props.eventInfo.permission ?? 'private';

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <h2>{props.eventInfo.name}</h2>
                    <span>{dateConverter(props.eventInfo.start_time)}</span>
                    <span> • </span>
                    <span>{timeConverter(props.eventInfo.start_time)}</span>
                    <span> - </span>
                    <span>{timeConverter(props.eventInfo.end_time)}</span>
                    <p>{description.length > 150 ? description.substring(0, 150) + '...' : description}</p>
                    <div style={{display: "flex", gap: "10px"}}>
                        <ChipGenerator chipType={props.eventInfo.event_type} />
                        <ChipGenerator chipType={permission} />		
			        </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
