import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer
			style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}
		>
			<small>
				Rakuten Asia &copy; 2021
				<Link to='/about'> About</Link> {process.env.NODE_ENV}
			</small>
		</footer>
	);
}

export default Footer;
