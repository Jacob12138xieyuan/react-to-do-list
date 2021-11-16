import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { loginStatusActions } from '../../redux_store/loginStatusSlice';
import './MyHeader.css';
import { Link } from 'react-router-dom';

function MyHeader() {
	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state.loginStatus);

	const logoutHandler = () => {
		dispatch(loginStatusActions.logout());
	};

	return (
		<>
			<Link to='/'>
				<Header as='h2'>
					<Icon.Group size='large'>
						<Icon name='clipboard' />
					</Icon.Group>
					My Todo List
				</Header>
			</Link>

			{userId && (
				<>
					<ul>
						<li className='nav'>
							<Link to='/sign-in' onClick={logoutHandler}>
								Logout
							</Link>
						</li>
						<li className='nav'>
							<Link to='/user-profile'>Profile</Link>
						</li>
						<li className='nav'>
							<Link to='/'>Home</Link>
						</li>
					</ul>
				</>
			)}
			<br />
		</>
	);
}

export default MyHeader;
