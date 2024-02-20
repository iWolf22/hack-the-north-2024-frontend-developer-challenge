import React from 'react';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import BuildIcon from '@mui/icons-material/Build';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import CampaignIcon from '@mui/icons-material/Campaign';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
		}}
		transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
		}}
		{...props}
	/>
	))
    (({ theme }) => ({
	'& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
		    padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
                ),
            },
		},
	},
}));

export default function EventsDropDown( props: { updateEventList: Function, color: string } ) {

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        for (let i = 1; i <= 10; i++) {
            if (JSON.stringify((event.target as HTMLInputElement).value) === JSON.stringify(i)) {
                props.updateEventList((event.target as HTMLInputElement).value);
            }
            
        }
	};

    var menuItemStyle = {
        fontFamily: "JetBrains Mono, monospace",
        color: props.color === 'light' ? 'black' : 'white',
        '&:hover': {
            backgroundColor: props.color === "light" ? '#cce4fc' : '#081d30'
        },
        transition: 'background 0.2s'
    }

    var iconStyle = {
        color: props.color === 'light' ? '#616161' : '#9b9b9b'
    }

	return (
	<div>
        <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            sx={{ fontFamily: "JetBrains Mono, monospace" }}
            endIcon={<KeyboardArrowDownIcon />}
        >
            Sort Or Filter
        </Button>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: props.color === 'light' ? '#f6f6f6' : '#282c34'
                },
            }}
            disableScrollLock={true}
        >
            <MenuItem onClick={handleClose} value="1" sx={menuItemStyle}>
                <CalendarMonthIcon style={iconStyle} />
                Sort: Date Ascending
            </MenuItem>
            <MenuItem onClick={handleClose} value="2" sx={menuItemStyle}>
                <CalendarMonthIcon style={iconStyle} />
                Sort: Date Descending
            </MenuItem>
            <MenuItem onClick={handleClose} value="3" sx={menuItemStyle}>
                <SortByAlphaIcon style={iconStyle} />
                Sort: Alphabetical A-Z
            </MenuItem>
            <MenuItem onClick={handleClose} value="4" sx={menuItemStyle}>
                <SortByAlphaIcon style={iconStyle} />
                Sort: Alphabetical Z-A
            </MenuItem>
            <Divider sx={{ my: 0.5 }} style={{background: props.color === 'light' ? '#616161' : '#9b9b9b'}} />
            <MenuItem onClick={handleClose} value="5" sx={menuItemStyle}>
                <BrightnessAutoIcon style={iconStyle} />
                Filter: All
            </MenuItem>
            <MenuItem onClick={handleClose} value="6" sx={menuItemStyle}>
                <PublicIcon style={iconStyle} />
                Filter: Public
            </MenuItem>
            <MenuItem onClick={handleClose} value="7" sx={menuItemStyle}>
                <PublicOffIcon style={iconStyle} />
                Filter: Private
            </MenuItem>
            <MenuItem onClick={handleClose} value="8" sx={menuItemStyle}>
                <CampaignIcon style={iconStyle} />
                Filter: Tech Talk
            </MenuItem>
            <MenuItem onClick={handleClose} value="9" sx={menuItemStyle}>
                <BuildIcon style={iconStyle} />
                Filter: Workshop
            </MenuItem>
            <MenuItem onClick={handleClose} value="10" sx={menuItemStyle}>
                <SportsVolleyballIcon style={iconStyle} />
                Filter: Activity
            </MenuItem>
        </StyledMenu>
        </div>
	);
}
