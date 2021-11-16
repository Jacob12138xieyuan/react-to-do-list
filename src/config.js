export const apiBaseUrl =
	process.env.REACT_APP_ENV === 'production'
		? process.env.REACT_APP_API_BASE_URL_PRODUCTION
		: process.env.REACT_APP_API_BASE_URL_DEVELOPMENT;

export const filterOptions = [
	{ key: 'All', text: 'All', value: 'All' },
	{ key: 'Pending', text: 'Pending', value: 'Pending' },
	{ key: 'Completed', text: 'Completed', value: 'Completed' },
];
