/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import FooterButtons from '../footer/FooterButtons';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

/**
 * Creates the About Me pop up modal
 *
 * @param color - the color theme, 'light' or 'dark'
 * @param modelOpen - whether or not the modal is open or not
 * @param modelHandleClose - function to close the modal
 * @return JSX Element that is the grid of items
 */
export default function AboutMe( props: { color: string, modelOpen: boolean, modelHandleClose: () => void }) {

	// Modal styles
	var style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: {xs: '80vw', md: '80vw', lg: '1000px'},
		bgcolor: props.color === 'light' ? '#f6f6f6' : '#282c34',
		border: '2px solid',
		borderColor: props.color === 'light' ? 'black' : 'white',
		boxShadow: 24,
		borderRadius: '5px',
		p: 4,
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={props.modelOpen}
			onClose={props.modelHandleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			{/* Fade in animation */}
			<Fade in={props.modelOpen}>
				<Box sx={style}>

					{/* Modal grid */}
					<Grid container>
						<Grid item xs={12} sm={8}>

							{/* Header modal text */}
							<Typography
								color={props.color === 'light' ? 'black' : 'white'}
								sx={{ fontFamily: 'JetBrains Mono, monospace', textTransform: 'none', fontSize: '24px' }}
							>
								Hi 👋, I'm Joshua Dierickse!
							</Typography>

							{/* Secondary modal text */}
							<Typography
								sx={{ fontFamily: 'Calibri, sans-serif', my: 1, textTransform: 'none' }}
								color={props.color === 'light' ? 'black' : 'white'}
							>
								🎓 I am a first-year student at the University of Waterloo for Computer Science!<br/>
								🛠️ I have experience with ReactJS, ExpressJS, MongoDB, PostgreSQL, OAuth 2.0, MaterialUI and more!<br/>
								💞️ I hope to spread the magic of HackTheNorth to future generations as a Frontend Developer!<br/>
								🥳 Fun fact: I am a big fan of hockey, chess, running, and have the cutest cat ever!<br/>
								😊 Thank you so much for considering my candidacy and I hope to connect soon!
							</Typography>

							{/* Row of contact buttons */}
							<FooterButtons color={props.color} />
						</Grid>

						{/* Head shot picture */}
						<Grid item xs={12} sm={4} sx={{display: {xs: 'none', sm: 'block' }}}>
							<Box style={{display:'flex', paddingLeft: '20px', justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%'}}>
								<img
									style={{width: '100%', objectFit: 'cover', borderRadius: '5px'}}
									src='https://iwolf22.github.io/Personal-Website/assets/img/profile-img.jpg'
									alt='Joshua Dierickse head shot'>
								</img>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Fade>
		</Modal>
	);
}
