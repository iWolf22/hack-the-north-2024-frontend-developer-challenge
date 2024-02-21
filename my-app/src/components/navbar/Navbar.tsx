/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutMe from '../aboutme/AboutMe';
import NavbarButton from './NavbarButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TerminalIcon from '@mui/icons-material/Terminal';

/**
 * Generates the navbar
 *
 * @param color - the color theme, "light" or "dark"
 * @param updateColor - function to update the website color
 * @param login - boolean regarding if the user has logged in
 * @param userLogout - function to log the user out
 * @return JSX Element
 */
export default function NavBar( props: { color: string, updateColor : Function, login: boolean, userLogout: Function } ) {

    // Initialize state
    var [modelOpen, setModelOpen] = useState(false);

    // Functions to set "modelOpen" as open and closed
    function modelHandleOpen() {
        setModelOpen(true)
    }
    function modelHandleClose() {
        setModelOpen(false)
    }

	return (
        <AppBar
            position='fixed'
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container maxWidth='lg'>

                {/* Navbar template code */}
                <Toolbar
                    variant='regular'
                    sx={() => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    borderRadius: '999px',
                    bgcolor:
                        props.color === 'light'
                        ? 'rgba(255, 255, 255, 0.4)'
                        : 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(24px)',
                    maxHeight: 40,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow:
                        props.color === 'light'
                        ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                        : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>

                            {/* Hackathon Global Inc.™ logo */}
                            <IconButton disableRipple component={Link} to={'/'} style={{padding: '0px 10px 0px 20px', margin:'0px'}}
                                sx={{'&:hover': {
                                    backgroundColor: 'transparent'
                                }, }}>
                                <TerminalIcon sx={{
                                    width: '30px',
                                    height: 'auto',
                                    cursor: 'pointer',
                                    color: props.color === 'light' ? 'black' : 'white'
                                }}/>
                            </IconButton>

                            {/* Navbar buttons */}
                            <NavbarButton color={props.color} name='Home' link='/' />
                            <NavbarButton color={props.color} name='Events' link='/events' />
                            <MenuItem
                                onClick={modelHandleOpen}
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
                                About Me
                            </MenuItem>

                            {/* AboutMe Modal */}
                            <AboutMe color={props.color} modelOpen={modelOpen} modelHandleClose={modelHandleClose} />
                        </Box>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'center',
                    }}
                    >

                    {/* Navbar sun/moon button to change color themes */}
                    <IconButton onClick={() => props.updateColor()}
                        sx={{
                            color: props.color === 'light' ? 'black' : 'white',
                            height: '30px',
                            width: '30px',
                            '&:hover': {
                                backgroundColor: props.color === 'light' ? '#d3dce7' : '#16283a'
                            }
                        }}>
                        { props.color === 'light' ? <LightModeIcon sx={{ width: '20px', height: '20px'}} /> : <DarkModeIcon sx={{ width: '20px'}} /> }
                    </IconButton>

                    {/* If you haven't logged in, display sign in/sign up buttons */}
                    { props.login === false ?
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: '10px', paddingTop: '4px'}}>
                            <Button
                                color='primary'
                                variant='text'
                                size='small'
                                component={Link}
                                to={'/login'}
                                sx={{ fontFamily: 'JetBrains Mono, monospace', '&:hover': { backgroundColor: props.color === 'light' ? '#d3dce7' : '#16283a'}, display: {xs: 'none', sm: 'initial'} }}
                                >
                                Sign in
                            </Button>
                        </div>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            component={Link}
                            to={'/login'}
                            sx={{ fontFamily: 'JetBrains Mono, monospace', width: '78px'}}
                        >
                            Sign up
                        </Button>
                    </div> :
                    <div>
                        {/* If you have signed in, display the logout button */}
                        <Button
                            color='primary'
                            variant='text'
                            size='small'
                            onClick={() => props.userLogout()}
                            sx={{ fontFamily: 'JetBrains Mono, monospace', '&:hover': { backgroundColor: props.color === 'light' ? '#d3dce7' : '#16283a'} }}
                        >
                        Logout
                        </Button>
                    </div>
                    }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
	);
}