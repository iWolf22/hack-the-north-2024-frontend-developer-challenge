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

export default function ChipGenerator( props: { chipType: string | any | 'private' | 'public' | 'workshop' | 'activity' | 'tech_talk'} ) {

    var chipList = [
        ['workshop', <Chip icon={<BuildIcon />} label='Workshop' />],
        ['activity', <Chip icon={<SportsVolleyballIcon />} label='Activity' />],
        ['tech_talk', <Chip icon={<CampaignIcon />} label='Tech Talk' />],
        ['public', <Chip icon={<PublicIcon />} label='Public' />],
        ['private', <Chip icon={<PublicOffIcon />} label='Private' />],
        ['Sort: Date Ascending', <Chip icon={<CalendarMonthIcon />} label='Sort: Date Ascending' />],
        ['Sort: Date Descending', <Chip icon={<CalendarMonthIcon />} label='Sort: Date Descending' />],
        ['Sort: Alphabetical A-Z', <Chip icon={<SortByAlphaIcon />} label='Sort: Alphabetical A-Z' />],
        ['Sort: Alphabetical Z-A', <Chip icon={<SortByAlphaIcon />} label='Sort: Alphabetical Z-A' />],
        ['Filter: All', <Chip icon={<BrightnessAutoIcon />} label='Filter: All' />],
        ['Filter: Public', <Chip icon={<PublicIcon />} label='Filter: Public' />],
        ['Filter: Private', <Chip icon={<PublicOffIcon />} label='Filter: Private' />],
        ['Filter: Tech Talk', <Chip icon={<CampaignIcon />} label='Filter: Tech Talk' />],
        ['Filter: Workshop', <Chip icon={<BuildIcon />} label='Filter: Workshop' />],
        ['Filter: Activity', <Chip icon={<SportsVolleyballIcon />} label='Filter: Activity' />]
    ];

    for (let i = 0; i < chipList.length; i++) {
        if (props.chipType == chipList[i][0]) {
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

