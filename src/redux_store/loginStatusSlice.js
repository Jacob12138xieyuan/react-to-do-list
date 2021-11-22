import { createSlice } from '@reduxjs/toolkit';

// Identify if user is loged in
const userId = localStorage.getItem('userId')
	? localStorage.getItem('userId')
	: null;

const loginStatusSlice = createSlice({
	name: 'loginStatus',
	initialState: { userId, userInfo: null },
	reducers: {
		// Change userId
		login(state, action) {
			state.userId = action.payload;
			localStorage.setItem('userId', action.payload);
		},
		logout(state, action) {
			state.userId = null;
			state.userInfo = null;
			localStorage.clear();
		},
		setUserInfo(state, action) {
			state.userInfo = action.payload;
		},
	},
});

export const loginStatusActions = loginStatusSlice.actions;
export default loginStatusSlice;
