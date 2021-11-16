import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStatusActions } from '../redux_store/loginStatusSlice';
import { Image, Button, Icon, Form, Message } from 'semantic-ui-react';
import avatar from '../images/avatar.jpg';
import authenticationService from '../services/AuthenticationService';

function UserProfile() {
	const dispatch = useDispatch();
	const newPasswordRef = useRef();

	const [changing, setChanging] = useState(false);
	const [errors, setErrors] = useState([]);

	const { userInfo } = useSelector((state) => state.loginStatus);

	const formSubmitHandler = async () => {
		// Change password request
		const password = newPasswordRef.current.value;
		if (password.trim() === '') {
			setErrors(['New password is required!']);
			return;
		}
		authenticationService
			.changeUserPassword({ id: userInfo.id, newPassword: password })
			.then(() => {
				dispatch(loginStatusActions.logout());
			})
			.catch((err) => {
				setErrors([err.message]);
			});
	};

	return (
		<div className='wrapper'>
			<h2>User Profile</h2>
			<Image src={avatar} size='medium' circular centered />
			<div style={{ textAlign: 'center', padding: '20px' }}>
				<p>Email: {userInfo.email}</p>
			</div>

			<Button
				primary
				fluid
				onClick={() => {
					setChanging((state) => {
						return !state;
					});
				}}
			>
				Change password
			</Button>
			<br />
			{errors.length > 0 && (
				<Message error header='Change password errors!' list={errors} />
			)}
			{changing && (
				<Form onSubmit={formSubmitHandler}>
					<Form.Field>
						<label>New password</label>
						<input
							ref={newPasswordRef}
							placeholder='New password'
							type='password'
							onFocus={() => setErrors([])}
						/>
					</Form.Field>
					<div style={{ textAlign: 'right' }}>
						<Button type='submit' color='green'>
							<Icon name='retweet' />
							Change
						</Button>
					</div>
				</Form>
			)}
		</div>
	);
}

export default UserProfile;
