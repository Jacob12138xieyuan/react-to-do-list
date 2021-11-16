import axios from 'axios';
import { apiBaseUrl } from '../config';

class TaskService {
	getAllTasks = () =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks`;
			axios
				.get(url)
				.then((res) => {
					console.log('Get all tasks successfully');
					resolve(res);
				})
				.catch((err) => {
					console.log(err.message);
					reject();
				});
		});

	addNewTask = (newTask) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks`;
			axios
				.post(url, newTask)
				.then((res) => {
					console.log('Add a new task successfully');
					resolve(res);
				})
				.catch((err) => {
					console.log(err.message);
					reject();
				});
		});

	updateTask = (updatedTask) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks`;
			axios
				.put(url, updatedTask)
				.then((res) => {
					console.log('Update a task successfully');
					resolve(res);
				})
				.catch((err) => {
					console.log(err.message);
					reject();
				});
		});

	deleteTask = (taskId) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks/${taskId}`;
			axios
				.delete(url)
				.then((res) => {
					console.log('Deleted a task');
					resolve(res);
				})
				.catch((err) => {
					console.log(err.message);
					reject();
				});
		});
}

const taskService = new TaskService();
export default taskService;
