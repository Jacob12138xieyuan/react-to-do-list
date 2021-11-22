import './App.css';
import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import MyHeader from './components/Layout/MyHeader';
import SignIn from './components/Auth/SignIn';
import Footer from './components/Layout/Footer';
import { Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import authenticationService from './services/AuthenticationService';
import { loginStatusActions } from './redux_store/loginStatusSlice';

// Lazy loading
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const SignUp = React.lazy(() => import('./components/Auth/SignUp'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const UserProfile = React.lazy(() => import('./components/UserProfile'));

function App() {
	const dispatch = useDispatch();

	const { userId, userInfo } = useSelector((state) => state.loginStatus);
	if (userId && !userInfo) {
		authenticationService
			.getUserInfoById(userId)
			.then((res) => {
				dispatch(loginStatusActions.setUserInfo(res.data.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className='App'>
			<div className='container'>
				<MyHeader />
				{/* Loading page for lazy loading */}
				<Suspense
					fallback={
						<Loader active inline='centered'>
							Loading...
						</Loader>
					}
				>
					<Switch>
						<Route path='/about' exact>
							<AboutPage />
						</Route>
						{userId && (
							<Switch>
								<Route path='/' exact>
									<HomePage />
								</Route>
								<Route path='/user-profile' exact>
									<UserProfile />
								</Route>
								<Route path='*'>
									<Redirect to='/' />
								</Route>
							</Switch>
						)}
						{!userId && (
							<Switch>
								<Route path='/sign-up' exact>
									<SignUp />
								</Route>
								<Route path='/sign-in' exact>
									<SignIn />
								</Route>
								<Route path='*'>
									<Redirect to='/sign-in' />
								</Route>
							</Switch>
						)}
					</Switch>
				</Suspense>
			</div>
			<Footer />
		</div>
	);
}

export default App;
