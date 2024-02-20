import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FooterButtons from '../footer/FooterButtons';

export default function AboutMe( props: { color: string, modelOpen: boolean, modelHandleClose: () => void }) {

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
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
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
				<Fade in={props.modelOpen}>
				<Box sx={style}>
				<Grid container>
					<Grid item xs={12} sm={8}>
						<Typography
							color={props.color === 'light' ? 'black' : 'white'}
							sx={{ fontFamily: "JetBrains Mono, monospace", textTransform: 'none', fontSize: '24px' }}
						>
							Hi 👋, I'm Joshua Dierickse!
						</Typography>
						<Typography
							sx={{ fontFamily: "Calibri, sans-serif", my: 1, textTransform: 'none' }}
							color={props.color === 'light' ? 'black' : 'white'}
						>
							🎓 I am a first-year student at the University of Waterloo for Computer Science!<br/>
							🛠️ I have experience with ReactJS, ExpressJS, MongoDB, PostgreSQL, OAuth 2.0, MaterialUI and more!<br/>
							💞️ I hope to spread the magic of HackTheNorth to future generations as a Frontend Developer!<br/>
							🥳 Fun fact: I am a big fan of hockey, chess, running, and have the cutest cat ever!<br/>
							😊 Thank you so much for considering my candidacy and I hope to connect soon!
						</Typography>
						<FooterButtons color={props.color} />
					</Grid>
					<Grid item xs={12} sm={4} sx={{display: {xs: 'none', sm: 'block' }}}>
						<Box style={{display:'flex', paddingLeft: '20px', justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%'}}>
							<img style={{width: '100%', objectFit: 'cover', borderRadius: '5px'}} src="https://iwolf22.github.io/Personal-Website/assets/img/profile-img.jpg"></img>
						</Box>
					</Grid>
				</Grid>
				</Box>
				</Fade>
			</Modal>
		</div>
	);
}
