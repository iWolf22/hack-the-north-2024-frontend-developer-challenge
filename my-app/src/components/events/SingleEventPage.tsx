import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { dateConverter, timeConverter } from '../other/Converters';
import ChipGenerator from './ChipGenerator';
import Link from '@mui/material/Link';
import EventsCard from './EventsCard';
import PersonIcon from '@mui/icons-material/Person';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
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

const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
});

export default function EventPage( props: { eventList: TEvent[], color: string, eventNumber: number, login: boolean } ) {

    function speakersList( speakers: { name: string }[] ) {
        var returnString = "";
        for (let i = 0; i < speakers.length; i++) {
            if (i === speakers.length - 1) {
                returnString = returnString + speakers[i].name
            } else {
                returnString = returnString + speakers[i].name + ", "
            }
        }
        return returnString;
    }

    var iconStyles = {
        height: "20px",
        marginRight: '5px',
        color: props.color === 'light' ? '#616161' : '#9b9b9b',
    }

    return (
        <Container sx={{ py: 16 }}>
            { (props.login === true || props.eventList[props.eventNumber].permission === "public" ) ?
            <div>
                <Typography component="h2" variant="h4" sx={{ fontFamily: "JetBrains Mono, monospace" }} color={props.color === 'light' ? 'black' : 'white'}>
                    {props.eventList[props.eventNumber].name}
                </Typography>
                <Typography
                        sx={{ fontFamily: "Calibri, sans-serif", my: 0.5, textTransform: 'none', color: props.color === 'light' ? '#616161' : '#9b9b9b' }}
                        color={props.color === 'light' ? 'black' : 'white'}
                    >
                        {dateConverter(props.eventList[props.eventNumber].start_time)} • {timeConverter(props.eventList[props.eventNumber].start_time)} - {timeConverter(props.eventList[props.eventNumber].end_time)}
                </Typography>
                <Typography
                    sx={{ fontFamily: "Calibri, sans-serif", my: 0.5, textTransform: 'none' }}
                    color={props.color === 'light' ? 'black' : 'white'}
                >
                    {props.eventList[props.eventNumber].description}
                </Typography>
                { props.eventList[props.eventNumber].speakers.length !== 0 && 
                    <Typography
                        sx={{ fontFamily: "Calibri, sans-serif" }}
                        color={props.color === 'light' ? 'black' : 'white'}
                    >
                        <PersonIcon style={iconStyles} sx={{position: 'relative', top: '4px'}} />
                        Speaker: { (speakersList(props.eventList[props.eventNumber].speakers)) }
                    </Typography> }
                { props.eventList[props.eventNumber].public_url !== "" &&
                    <Typography
                        sx={{ fontFamily: "Calibri, sans-serif" }}
                        color={props.color === 'light' ? 'black' : 'white'}
                    >
                        <InsertLinkIcon style={iconStyles} sx={{position: 'relative', top: '4px'}} />
                        Public Link: <Link href="#" underline="hover">{props.eventList[props.eventNumber].public_url}</Link>
                    </Typography> }
                { (props.eventList[props.eventNumber].private_url !== "" && props.login === true) &&
                    <Typography
                        sx={{ fontFamily: "Calibri, sans-serif" }}
                        color={props.color === 'light' ? 'black' : 'white'}
                    >
                        <LinkOffIcon style={iconStyles} sx={{position: 'relative', top: '4px'}} />
                        Private Link: <Link href="#" underline="hover">{props.eventList[props.eventNumber].private_url}</Link>
                    </Typography> }
                <div style={{display: "flex", gap: "10px", margin: '10px 0px 0px 0px'}}>
                    <ChipGenerator color={props.color} chipType={props.eventList[props.eventNumber].event_type} />
                    <ChipGenerator color={props.color} chipType={props.eventList[props.eventNumber].permission} />	
                </div>
                { props.eventList[props.eventNumber].related_events.length !== 0 &&
                <div>
                    <Typography component="h2" variant="h4" sx={{ fontFamily: "JetBrains Mono, monospace"}} style={{margin: '40px 0px 15px 0px'}} color={props.color === 'light' ? 'black' : 'white'}>
                        Related Events
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 4, md: 8, lg: 12 }}>
                        {props.eventList[props.eventNumber].related_events.map((eventId, index) => {
                            var correctIndex = 0;
                            for (let i = 0; i < props.eventList.length; i++) {
                                if (props.eventList[i].id === eventId) {
                                    correctIndex = i;
                                }
                            }
                            if (props.eventList[correctIndex].permission === "private" && props.login === false) {
                                return;
                            }
                            return (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <EventsCard
                                        key={index}
                                        eventInfo={props.eventList[correctIndex]}
                                        color={props.color}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>}
            </div>
            : <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            {props.color === 'light'
            ? <Alert severity="error">Private event, need to login!</Alert>
            : <ThemeProvider theme={darkTheme}>
                <Alert severity="error">Private event, need to login!</Alert>
            </ThemeProvider>}
        </div>}
        </Container>
    );
}
