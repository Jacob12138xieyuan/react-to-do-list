import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
	name: 'task',
	initialState: { tasks: null },
	reducers: {
		setTasks(state, action) {
			state.tasks = action.payload;
		},
		addNewTask(state, action) {
			if (state.tasks === null) {
				state.tasks = [];
			}
			state.tasks = [action.payload, ...state.tasks];
		},
		updateTask(state, action) {
			state.tasks = state.tasks.map((task) =>
				task.id === action.payload.id ? action.payload : task
			);
		},
		deleteTask(state, action) {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
	},
});

export const taskActions = taskSlice.actions;
export default taskSlice;
