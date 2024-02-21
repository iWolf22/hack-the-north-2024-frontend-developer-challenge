/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import Chip from '@mui/material/Chip';
import BuildIcon from '@mui/icons-material/Build';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import CampaignIcon from '@mui/icons-material/Campaign';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Generates the custom chips
 *
 * @param chipType - the type of chip that needs to be returned
 * @param color - the color theme, 'light' or 'dark'
 * @return JSX Element
 */
export default function ChipGenerator( props: { chipType: string | any | 'private' | 'public' | 'workshop' | 'activity' | 'tech_talk', color: string } ) {

    // Text color styling
    var textColor = props.color === 'light' ? '#616161' : '#9b9b9b';

    // MaterialUI chip styling
    var chipStyles = {
        border: '2px ' + textColor + ' solid',
        background: 'transparent',
        color: textColor,
        fontFamily: 'JetBrains Mono, monospace',
        opacity: '100%',
        height: '25px',
        fontSize: '10px',
        p: '0px',
        m: '0px'
    }

    // Chip icon styling
    var iconStyles = {
        color: textColor,
        height: '15px',
    }

    // List of the names of the chips and there corresponding <Chip /> component
    var chipList = [
        ['workshop', <Chip icon={<BuildIcon style={iconStyles} />} sx={chipStyles} label='Workshop' />],
        ['activity', <Chip icon={<SportsVolleyballIcon style={iconStyles} />} sx={chipStyles} label='Activity' />],
        ['tech_talk', <Chip icon={<CampaignIcon style={iconStyles} />} sx={chipStyles} label='Tech Talk' />],
        ['public', <Chip icon={<PublicIcon style={iconStyles} />} sx={chipStyles} label='Public' />],
        ['private', <Chip icon={<PublicOffIcon style={iconStyles} />} sx={chipStyles} label='Private' />],
        ['Sort: Date Ascending', <Chip icon={<CalendarMonthIcon style={iconStyles} />} sx={chipStyles} label='Sort: Date Ascending' />],
        ['Sort: Date Descending', <Chip icon={<CalendarMonthIcon style={iconStyles} />} sx={chipStyles} label='Sort: Date Descending' />],
        ['Sort: Alphabetical A-Z', <Chip icon={<SortByAlphaIcon style={iconStyles} />} sx={chipStyles} label='Sort: Alphabetical A-Z' />],
        ['Sort: Alphabetical Z-A', <Chip icon={<SortByAlphaIcon style={iconStyles} />} sx={chipStyles} label='Sort: Alphabetical Z-A' />],
        ['Filter: All', <Chip icon={<BrightnessAutoIcon style={iconStyles} />} sx={chipStyles} label='Filter: All' />],
        ['Filter: Public', <Chip icon={<PublicIcon style={iconStyles} />} sx={chipStyles} label='Filter: Public' />],
        ['Filter: Private', <Chip icon={<PublicOffIcon style={iconStyles} />} sx={chipStyles} label='Filter: Private' />],
        ['Filter: Tech Talk', <Chip icon={<CampaignIcon style={iconStyles} />} sx={chipStyles} label='Filter: Tech Talk' />],
        ['Filter: Workshop', <Chip icon={<BuildIcon style={iconStyles} />} sx={chipStyles} label='Filter: Workshop' />],
        ['Filter: Activity', <Chip icon={<SportsVolleyballIcon style={iconStyles} />} sx={chipStyles} label='Filter: Activity' />]
    ];

    // Searches for and returns the correct chip, otherwise returns an error chip
    for (let i = 0; i < chipList.length; i++) {
        if (props.chipType === chipList[i][0]) {
            return (
                <div>
                    {chipList[i][1]}
                </div>
            );
        }
    }
    return (
        <Chip icon={<ErrorOutlineIcon />} label='Chip Error' />
    )
}

