import React, { useRef, useState } from 'react';
import { Form, Message, Icon, Button } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import authenticationService from '../../services/AuthenticationService';

function SignUp() {
	const history = useHistory();

	// Error state
	const [errors, setErrors] = useState();
	// Button loading state
	const [buttonLoading, setButtonLoading] = useState(false);

	// Define fields reference
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	// Sign up form submission
	const signUpFormSubmitHandler = async () => {
		setButtonLoading(true);

		// 123@123.com
		const email = emailRef.current.value;
		// 123456
		const password = passwordRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;

		// Frontend validation
		if (
			email.trim() === '' ||
			password.trim() === '' ||
			confirmPassword.trim() === ''
		) {
			setErrors('All fields are required!');
			setButtonLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			setErrors('Password not the same!');
			setButtonLoading(false);
			return;
		}
		authenticationService
			.signup(email, password)
			.then((res) => {
				setButtonLoading(false);
				history.push('/sign-in');
			})
			.catch((err) => {
				setErrors(err.response.data.message);
				setButtonLoading(false);
			});

		// Backend validation
		// const response = await fetch(, {
		// 	method: 'POST',
		// 	body: JSON.stringify({ email, password }),
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// });
		// const responseData = await response.json();
		// if (response.ok) {
		// 	history.push('/sign-in');
		// } else {
		// 	// Handle errors
		// 	// console.log(responseData.error);
		// 	const tempErrors = [];
		// 	responseData.error.errors.forEach((error) => {
		// 		switch (error.message) {
		// 			case 'EMAIL_EXISTS':
		// 				tempErrors.push('This email is already registered.');
		// 				break;
		// 			case 'WEAK_PASSWORD : Password should be at least 6 characters':
		// 				tempErrors.push('Your password should be at least 6 digits.');
		// 				break;
		// 			case 'TOO_MANY_ATTEMPTS_TRY_LATER: We have blocked all requests from this device due to unusual activity. Try again later.':
		// 				tempErrors.push(
		// 					'We have blocked all requests from this device due to unusual activity. Try again later.'
		// 				);
		// 				break;
		// 			default:
		// 				tempErrors.push('Unknown error');
		// 				break;
		// 		}
		// 	});
		// 	setErrors(tempErrors);
		// 	setButtonLoading(false);
		// }
	};

	return (
		<div className='wrapper'>
			<h2>Sign Up</h2>

			{/* render validation errors */}
			{errors && <Message error content={errors} />}

			<Form className='fluid' onSubmit={signUpFormSubmitHandler}>
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
				<Form.Field>
					<label>Confirm password</label>
					<input
						ref={confirmPasswordRef}
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
				Already signed up?&nbsp;<Link to='sign-in'>Login here</Link>
				&nbsp;instead.
			</Message>
		</div>
	);
}

export default SignUp;
