import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Message, Icon, Button } from 'semantic-ui-react';
import authenticationService from '../../services/AuthenticationService';
import { loginStatusActions } from '../../redux_store/loginStatusSlice';

function SignIn() {
	const dispatch = useDispatch();

	// Error state
	const [errors, setErrors] = useState('');
	// Button loading state
	const [buttonLoading, setButtonLoading] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();

	const signInFormSubmitHandler = async () => {
		setButtonLoading(true);

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		// Simple form validation
		if (email.trim() === '' || password.trim() === '') {
			setErrors('All fields are required!');
			setButtonLoading(false);
			return;
		}
		// authenticate user
		authenticationService
			.login(email, password)
			.then((res) => {
				console.log('Get all tasks successfully');
				setButtonLoading(false);
				dispatch(loginStatusActions.login(res.data.data.id));
			})
			.catch((err) => {
				setErrors(err.response.data.message);
				setButtonLoading(false);
			});
	};

	return (
		<div className='wrapper'>
			<h2>Sign In</h2>
			{errors && <Message error content={errors} />}
			<Form className='fluid' onSubmit={signInFormSubmitHandler}>
				<Form.Field>
					<label>Email</label>
					<input
						ref={emailRef}
						placeholder='Email'
						type='email'
						onFocus={() => setErrors('')}
					/>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<input
						ref={passwordRef}
						type='password'
						onFocus={() => setErrors('')}
					/>
				</Form.Field>

				<Button color='blue' type='submit' loading={buttonLoading}>
					Submit
				</Button>
			</Form>
			<Message warning>
				<Icon name='help' />
				Don't have a account yet?&nbsp;<Link to='sign-up'> Sign up</Link>
				&nbsp;here instead.
			</Message>
		</div>
	);
}

export default SignIn;
