import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {

	return (
		<nav>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Hackathon Global Inc.™
                        </Typography>
                        <Button component={Link} to={'/'} color="inherit">Home</Button>
                        <Button component={Link} to={'/events'} color="inherit">Events</Button>
                        <Button component={Link} to={'/login'} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
		</nav>
	);
}