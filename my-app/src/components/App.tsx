import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";

import Container from '@mui/material/Container';

export default function App() {
	var [ result, setResult ] = useState("Temp!")

	// Make a request for a user with a given ID
	axios.get("https://api.hackthenorth.com/v3/events")
		.then((res) => {
			console.log(res.data);
			setResult(JSON.stringify(res.data));
		})
		.catch((err) => {
			console.log(err);
			setResult(JSON.stringify(err));
		});

	return (
		<div>
			<Navbar />
			<Container maxWidth="lg">
				<Routes>
					<Route path="/" element={<div><h1>Hackathon</h1><p>{result}</p></div>}></Route>
					<Route path="/pricing" element={<div><h1>Pricing</h1><p>{result}</p></div>}></Route>
					<Route path="/about" element={<div><h1>About</h1><p>{result}</p></div>}></Route>
				</Routes>
			</Container>
		</div>
	);
}
