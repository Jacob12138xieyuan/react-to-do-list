export const reactAppBaseUrl = ['development'].includes(
	process.env.NODE_ENV.trim()
)
	? process.env.REACT_APP_BASE_URL_DEVELOPMENT
	: process.env.REACT_APP_BASE_URL_PRODUCTION;

export const apiBaseUrl = ['development'].includes(process.env.NODE_ENV.trim())
	? process.env.REACT_APP_API_BASE_URL_DEVELOPMENT
	: process.env.REACT_APP_API_BASE_URL_PRODUCTION;

export const filterOptions = [
	{ key: 'All', text: 'All', value: 'All' },
	{ key: 'Pending', text: 'Pending', value: 'Pending' },
	{ key: 'Completed', text: 'Completed', value: 'Completed' },
];
