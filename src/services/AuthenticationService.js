import axios from 'axios';
import { apiBaseUrl } from '../config';

class AuthenticationService {
	login = (email, password) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}users/login`;
			axios
				.post(url, { email, password })
				.then((res) => {
					console.log('Login user successfully');
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});

	signup = (email, password) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}users`;
			axios
				.post(url, { email, password })
				.then((res) => {
					console.log('Create user successfully');
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});

	changeUserPassword = (userWithNewPassword) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}users`;
			axios
				.put(url, userWithNewPassword)
				.then((res) => {
					console.log('Changed user password successfully');
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});

	getUserInfoById = (userId) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}users/${userId}`;
			axios
				.get(url)
				.then((res) => {
					console.log('Get user info successfully');
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
}

const authenticationService = new AuthenticationService();
export default authenticationService;
