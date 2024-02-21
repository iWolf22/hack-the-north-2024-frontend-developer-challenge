/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import FooterButtons from './FooterButtons';

/**
 * Generates the website footer
 *
 * @param color - the color theme, "light" or "dark"
 * @return JSX Element
 */
export default function Footer( props: { color: string }) {

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div>

                {/* Displays the Footer text */}
                <Typography
                    color={props.color === 'light' ? 'black' : 'white'}
                    sx={{ fontFamily: 'JetBrains Mono, monospace', textTransform: 'none' }}
                >
                    Made With ❤️ By Joshua Dierickse
                </Typography>

                {/* Displays the row of contact buttons */}
                <div style={{display: 'flex', justifyContent: 'center', gap: '5px', margin: '5px'}}>
                    <FooterButtons color={props.color} />
                </div>
            </div>
        </div>
    );
};