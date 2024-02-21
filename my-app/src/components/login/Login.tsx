/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React, { useState } from 'react';
import InputField from '../other/InputField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScrollToTop from '../other/ScrollToTop';

// MaterialUI dark theme
var darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

/**
 * Generates the login page
 *
 * @param color - the color theme, "light" or "dark"
 * @param userLogin - function to check if the user can login
 * @param login - boolean regarding if the user has logged in
 * @param prevLogin - the status of the user's previous login attempt
 * @return JSX Element
 */
export default function Login( props: { color: string, userLogin: Function, login: boolean, prevLogin: string }) {

	// Initialize state
	var [username, setUsername] = useState('');
	var [password, setPassword] = useState('');

	// When the username input field is change, update username state
	function usernameChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setUsername(event.currentTarget.value);
	}

	// When the password input field is change, update password state
	function passwordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setPassword(event.currentTarget.value);
	}

	// Function to generate an alert about the current login status
	function loginAlert() {
		if (props.color === 'dark') {
			return (
				<ThemeProvider theme={darkTheme}>
					{innerLoginAlert()}
				</ThemeProvider>
			);
		} 
		return (<div>{innerLoginAlert()}</div>);
	}

	// Helper function to loginAlert()
	function innerLoginAlert() {
		if (props.login === false && props.prevLogin === 'null') {
			return (<Alert severity='warning'>Not currently logged in!</Alert>);
		} else if (props.login === false && props.prevLogin === 'fail') {
			return (<Alert severity='error'>Failed login attempt!</Alert>);
		} else if (props.login === true && props.prevLogin === 'success') {
			return (<Alert severity='success'>Successful login attempt!</Alert>);
		} else if (props.login === true && props.prevLogin === 'fail') {
			return (<Alert severity='success'>Failed login attempt, but already logged in!</Alert>);
		} else {
			return (<Alert severity='success'>Already logged in!</Alert>);
		}
	}

	return (
		<Container component='main' maxWidth='sm' sx={{ py: 16 }}>

			{/* Scrolls to the top when switching tabs */}
			<ScrollToTop />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Login page header text */}
				<Typography component='h2' variant='h4' sx={{ fontFamily: 'JetBrains Mono, monospace', textAlign: 'center' }} color={props.color === 'light' ? 'black' : 'white'}>
					Hackathon Global Inc.™ Sign In / Sign Up
				</Typography>
				<Box width='340px'>

					{/* Login page body text */}
					<Typography
						variant='body1'
						color={props.color === 'light' ? 'black' : 'white'}
						sx={{ my: { xs: 1, sm: 2 }, fontFamily: 'Calibri, sans-serif' }}
					>
						Logging in gives exclusive access to private events!
						<br/>Temporary Username: 'I &lt;3'
						<br/>Temporary Password: 'HackTheNorth'
					</Typography>

					{/* Generates the login alert */}
					{loginAlert()}

					{/* Username and password input fields + submit button */}
					<InputField handleChange={usernameChange} color={props.color} content={username} title='Username' />
					<InputField handleChange={passwordChange} color={props.color} content={password} title='Password' />
					<Button
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2, fontFamily: 'JetBrains Mono, monospace' }}
						onClick={() => props.userLogin(username, password)}
					>
						Sign In / Sign Up
					</Button>
				</Box>
			</Box>
		</Container>
	);
}