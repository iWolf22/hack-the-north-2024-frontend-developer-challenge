/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { dateConverter, timeConverter } from '../other/Converters';
import ChipGenerator from './ChipGenerator';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

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

/**
 * Generates a custom card for each event
 *
 * @param eventInfo - the info about the specific event
 * @param color - the color theme, 'light' or 'dark'
 * @return JSX Element
 */
export default function EventsCard( props: { eventInfo: TEvent, color: string } ) {

    // Special variables to make TypeScript happy
    var description = props.eventInfo.description ?? '';
    var permission = props.eventInfo.permission ?? 'private';

    return (
        <Card
            style={{
                border: '1px solid',
                padding: '5px',
                borderColor: props.color === 'light' ? '#dde8ef' : '#191f25',
            }}
            sx={{
                height: 'fit-content',
                width: '100%',
                background: 'none',
                boxShadow: 0,
                backgroundColor: props.color === 'light' ? 'white' : '#090e10',
                '&:hover': {
                    backgroundColor: props.color === 'light' ? '#cce4fc' : '#081d30',
                    borderColor: props.color === 'light' ? '#9cccfc !important' :  '#02294f !important'
                },
        }}>
            
            {/* Turns the <Card /> into a button */}
            <ButtonBase component={Link} to={'/' + props.eventInfo.name.replace(/\W/g, '')}>

                {/* <Card /> contents */}
                <Box sx={{p: '15px'}}>

                    {/* <Card /> header with the name of the event */}
                    <Typography
                        color={props.color === 'light' ? 'black' : 'white'}
                        sx={{ fontFamily: 'JetBrains Mono, monospace', textTransform: 'none' }}
                    >
                        {props.eventInfo.name}
                    </Typography>

                    {/* Date and start/end time of the event */}
                    <Typography
                        sx={{ fontFamily: 'Calibri, sans-serif', my: 0.5, textTransform: 'none', fontSize: '12px', color: props.color === 'light' ? '#616161' : '#9b9b9b' }}
                        color={props.color === 'light' ? 'black' : 'white'}
                    >
                        {dateConverter(props.eventInfo.start_time)} • {timeConverter(props.eventInfo.start_time)} - {timeConverter(props.eventInfo.end_time)}
                    </Typography>

                    {/* Description of the event itself */}
                    <Typography
                        sx={{ fontFamily: 'Calibri, sans-serif', my: 0.5, textTransform: 'none' }}
                        color={props.color === 'light' ? 'black' : 'white'}
                    >
                        {description.length > 120 ? description.substring(0, 120) + '...' : description}
                    </Typography>

                    {/* Chips to display special information about the event */}
                    <div style={{display: 'flex', gap: '10px', margin: '10px 0px 0px 0px'}}>
                        <ChipGenerator color={props.color} chipType={props.eventInfo.event_type} />
                        <ChipGenerator color={props.color} chipType={permission} />		
                    </div>
                </Box>
            </ButtonBase>
        </Card>
    );
}
