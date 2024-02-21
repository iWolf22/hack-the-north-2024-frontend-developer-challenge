/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

/**
 * Generates the button
 *
 * @param color - the color theme, "light" or "dark"
 * @param name - text for the button
 * @param link - where the button will point to within react router
 * @return JSX Element
 */
export default function NavbarButton( props: { color: string, name: string, link: string } ) {

	return (
        // Generates the button
        <MenuItem
            component={Link} to={props.link}
            sx={{
                py:'6px',
                px: '12px',
                borderRadius: '999px',
                transition: 'background 0.3s',
                fontFamily: 'JetBrains Mono, monospace',
                '&:hover': {
                    backgroundColor: props.color === 'light' ? '#d3dce7' : '#16283a'
                },
                color: props.color === 'light' ? 'black' : 'white' 
            }}
            >
            {props.name}
        </MenuItem>
	);
}