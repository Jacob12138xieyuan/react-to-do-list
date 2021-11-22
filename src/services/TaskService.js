import axios from 'axios';
import { apiBaseUrl } from '../config';

class TaskService {
	getAllTasks = () =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks`;
			axios
				.get(url)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});

	addNewTask = (newTask) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks`;
			axios
				.post(url, newTask)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});

	updateTask = (updatedTask) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks/${updatedTask.id}`;
			axios
				.put(url, updatedTask)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});

	deleteTask = (taskId) =>
		new Promise((resolve, reject) => {
			let url = `${apiBaseUrl}tasks/${taskId}`;
			axios
				.delete(url)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
}

const taskService = new TaskService();
export default taskService;
