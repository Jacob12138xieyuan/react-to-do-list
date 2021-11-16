import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import avatar from '../../images/me2.jpeg';

function AboutDeveloper() {
	return (
		<>
			<h2>About the Developer</h2>
			<div style={{ margin: 'auto' }}>
				<Card fluid>
					<Image src={avatar} wrapped ui={false} />
					<Card.Content>
						<Card.Header>Jacob Xie</Card.Header>
						<Card.Meta>
							<span className='date'>Joined Rakuten Asia in July 2021</span>
						</Card.Meta>
						<Card.Description>
							Jacob is a nice full stack programmer.
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Icon name='heart' />
						22 likes
					</Card.Content>
				</Card>
			</div>
		</>
	);
}

export default AboutDeveloper;
