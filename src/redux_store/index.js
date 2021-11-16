import { configureStore } from '@reduxjs/toolkit';

import loginStatusSlice from './loginStatusSlice';
import taskSlice from './taskSlice';

const store = configureStore({
	reducer: {
		loginStatus: loginStatusSlice.reducer,
		task: taskSlice.reducer,
	},
});

export default store;
