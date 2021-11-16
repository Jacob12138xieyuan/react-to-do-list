export const apiBaseUrl = ['production'].includes(process.env.NODE_ENV)
	? process.env.REACT_APP_API_BASE_URL_PRODUCTION
	: process.env.REACT_APP_API_BASE_URL_DEVELOPMENT;

export const filterOptions = [
	{ key: 'All', text: 'All', value: 'All' },
	{ key: 'Pending', text: 'Pending', value: 'Pending' },
	{ key: 'Completed', text: 'Completed', value: 'Completed' },
];
