/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ScrollToTop from '../other/ScrollToTop';

// Info for the home page cards
var items = [
    {
        icon: <PeopleIcon />,
        title: 'Amazing Community',
        description: 'Have no friends like me? Not a problem at all! Hackathon Global Inc.™ has an amazing community of super friendly and nice people!',
        image: 'https://hackthenorth.com/static/media/youbelongintech2.5e4452798b0547c2c45b.jpg'
    },
    {
        icon: <FastfoodIcon />,
        title: 'Meals Provided',
        description: 'Unlike MIT Hacks and PennApps, we don\'t serve cold pizza! Our Hackers get fresh and health meals with inclusive dietary options!',
        image: 'https://hackthenorth.com/static/media/youbelongintech1.381e3a6efc2add0e9908.jpg'
    },
    {
        icon: <CheckroomIcon />,
        title: 'Free Swag',
        description: 'What\s better than free food? Free swag! Our sponsor bay gives out free t-shirts like candy on Halloween!',
        image: 'https://hackthenorth.com/static/media/connection.d36c03b2e34f8c67a015.jpeg'
    },
];

/**
 * Generates the home page
 *
 * @param color - the color theme, "light" or "dark"
 * @return JSX Element
 */
export default function Home( props: { color: string }) {

	// Sets up the selectedItemIndex state
	var [selectedItemIndex, setSelectedItemIndex] = useState(0);

	// If one of the items are clicked, update selectedItemIndex state
	function handleItemClick(index: number) {
		setSelectedItemIndex(index);
	}

	return (
		<Container sx={{ py: 16 }}>

			{/* Scrolls to the top when switching tabs */}
			<ScrollToTop />
			<Grid container spacing={6}>
				<Grid item xs={12} md={6}>
					<div>

						{/* Home page header */}
						<Typography component='h2' variant='h4' sx={{ fontFamily: 'JetBrains Mono, monospace' }} color={props.color === 'light' ? 'black' : 'white'}>
							Hackathon Global Inc.™
						</Typography>

						{/* Home page description */}
						<Typography
							variant='body1'
							color={props.color === 'light' ? 'black' : 'white'}
							sx={{ mb: { xs: 2, sm: 4 }, fontFamily: 'Calibri, sans-serif' }}
						>
							On September 7th, Hackathon Global Inc.™ will host Canada's biggest and best Hackathon at the University of Waterloo, where you can team with up to 4 friends to build an awesome project within 36 hours. What are you waiting for, sign up for free today!
						</Typography>
					</div>

					<Stack
						direction='column'
						justifyContent='center'
						alignItems='flex-start'
						spacing={2}
						useFlexGap
						sx={{ width: '100%', display: 'flex' }}
					>

					{/* Displays all the home page cards */}
					{items.map(({ icon, title, description }, index) => (
					<Card
						key={index}
						component={Button}
						onClick={() => handleItemClick(index)}
						style={{
							border: '1px solid',
							borderColor: props.color === 'light' ? (selectedItemIndex === index ? '#9cccfc' : '#dde8ef') : (selectedItemIndex === index ? '#02294f' : '#191f25')
						}}
						sx={{
							p: 3,
							height: 'fit-content',
							width: '100%',
							background: 'none',
							border: '5px',
							boxShadow: 0,
							backgroundColor: selectedItemIndex === index ? (props.color === 'light' ? '#ebf5fe' : '#07131d' ) : undefined,
							'&:hover': {
								backgroundColor: props.color === 'light' ? '#cce4fc' : '#081d30'
							},
						}}
					>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								textAlign: 'left',
								flexDirection: { xs: 'column', md: 'row' },
								alignItems: { md: 'center' },
								gap: 2.5,
							}}
						>
							{/* Card icon */}
							<Box
								sx={{
									color: () => {
										if (props.color === 'light') {
											return selectedItemIndex === index ? 'primary.main' : '#9b9b9b';
										}
										return selectedItemIndex === index ? 'primary.main' : '#616161';
									},
								}}
							>
								{icon}
							</Box>
							<div>
								{/* Card title text */}
								<Typography
									color={props.color === 'light' ? 'black' : 'white'}
									sx={{ fontFamily: 'JetBrains Mono, monospace', textTransform: 'none' }}
								>
									{title}
								</Typography>

								{/* Card body text */}
								<Typography
									sx={{ fontFamily: 'Calibri, sans-serif', my: 0.5, textTransform: 'none' }}
									color={props.color === 'light' ? 'black' : 'white'}
								>
									{description}
								</Typography>
							</div>
						</Box>
					</Card>
					))}
				</Stack>
				</Grid>

				{/* Picture element */}
				<Grid
					item
					xs={12}
					md={6}
					sx={{ display: 'flex' , width: '100%' }}
				>
				<Card
					variant='outlined'
					sx={{
						height: '100%',
						width: '100%',
						display: 'flex',
						pointerEvents: 'none',
						backgroundColor: props.color === 'light' ? '#fdfeff' : '#0b1114'
					}}
					style={{
						border: '1px solid',
						borderColor: props.color === 'light' ? '#dde8ef' :  '#191f25'
					}}
				>
					<img
					style={{
						margin: 'auto',
						width: 420,
						height: 240,
						borderRadius: '5px'
					}}
					src={items[selectedItemIndex].image}></img>
				</Card>
				</Grid>
			</Grid>
		</Container>
	);
}