import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {

	return (
		<nav>
            <ul>
                <li><Link to="/" className="site-title">Site Name</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
		</nav>
	);
}