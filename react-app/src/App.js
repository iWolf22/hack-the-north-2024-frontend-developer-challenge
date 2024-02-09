import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

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
			<h1>Hackathon</h1>
			<p>{result}</p>
		</div>
	);
}

export default App;
