import React from 'react';
import AboutApp from '../components/AboutPage/AboutApp';
import AboutDeveloper from '../components/AboutPage/AboutDeveloper';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function AboutPage() {
	return (
		<div className='wrapper'>
			<AboutApp />
			<AboutDeveloper />
			<div
				style={{ textAlign: 'right', marginTop: '20px', marginRight: '20px' }}
			>
				<Link to='/'>
					<Button type='button' color='blue'>
						<Icon name='home' />
						Back
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default AboutPage;
