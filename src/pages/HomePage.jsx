import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	List,
	Message,
	Loader,
	Dropdown,
	Divider,
	Button,
	Checkbox,
	Form,
	Icon,
} from 'semantic-ui-react';
import TaskItem from '../components/TaskItem';
import taskService from '../services/TaskService';
import { taskActions } from '../redux_store/taskSlice';
import { filterOptions } from '../config';

function HomePage() {
	const [name, setName] = useState('');
	const [finished, setFinished] = useState(false);
	const [formMessage, setFormMessage] = useState({
		isOpen: false,
		content: '',
		type: '',
	});

	const dispatch = useDispatch();
	const { tasks } = useSelector((state) => state.task);
	const [taskLoading, setTaskLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [filterOption, setFilterOption] = useState(filterOptions[0].value);
	const [message, setMessage] = useState({
		isOpen: false,
	});

	const { userId } = useSelector((state) => state.loginStatus);

	useEffect(() => {
		if (tasks === null) {
			// Fetch tasks data from backend
			setTaskLoading(true);
			taskService
				.getAllTasks()
				.then((res) => {
					dispatch(taskActions.setTasks(res.data.data));
					setMessage({
						isOpen: false,
					});
				})
				.catch(() => {
					setMessage({
						isOpen: true,
						content: 'Network error',
						type: 'negative',
					});
				})
				.finally(() => {
					setTaskLoading(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// form submit handler
	const formSubmitHandler = (event) => {
		event.preventDefault();
		// Simple form validation
		if (name.trim() === '') {
			setFormMessage({
				isOpen: true,
				content: 'Name should not be empty!',
				type: 'negative',
			});
			return;
		}
		// post new task
		setSubmitLoading(true);
		taskService
			.addNewTask({ userId, name, finished })
			.then((res) => {
				// update UI
				console.log('Add a new task successfully');
				dispatch(taskActions.addNewTask(res.data.data));
				setFormMessage({
					isOpen: true,
					content: 'New task added!',
					type: 'positive',
				});
				setMessage({
					isOpen: false,
				});
			})
			.catch(() => {
				setFormMessage({
					isOpen: true,
					content: 'Network error',
					type: 'negative',
				});
			})
			.finally(() => {
				setName('');
				setFinished(false);
				setSubmitLoading(false);
			});
	};

	const renderAddForm = () => {
		return (
			<div>
				<Form onSubmit={formSubmitHandler}>
					<Form.Field>
						<label>What to do?</label>
						<input
							placeholder='What to do'
							onChange={(e) => setName(e.target.value)}
							// dismiss error when focus again
							onFocus={() =>
								setFormMessage({
									isOpen: false,
								})
							}
							value={name}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							label='Task Finished'
							onChange={(_, data) => setFinished(data.checked)}
							checked={finished}
						/>
					</Form.Field>

					{formMessage.isOpen && (
						<Message
							negative={formMessage.type === 'negative'}
							positive={formMessage.type === 'positive'}
							warning={formMessage.type === 'warning'}
							content={formMessage.content ? formMessage.content : null}
						/>
					)}

					<Button type='submit' color='green' loading={submitLoading}>
						<Icon name='add' />
						Add Task
					</Button>
				</Form>
				<br />
			</div>
		);
	};

	const renderFilter = () => {
		return (
			<div style={{ textAlign: 'right' }}>
				<Dropdown
					options={filterOptions}
					defaultValue={filterOption}
					onChange={(_, data) => setFilterOption(data.value)}
				></Dropdown>
				<Divider />
			</div>
		);
	};

	const renderTaskList = () => {
		// Conditionally render base on filterOption
		if (filterOption === 'All') {
			const taskList = tasks.map((task) => {
				return <TaskItem key={task.id} task={task} />;
			});
			return (
				<List divided relaxed>
					{taskList}
				</List>
			);
		} else if (filterOption === 'Pending') {
			const taskList = tasks
				.filter((task) => !task.finished)
				.map((task) => {
					return <TaskItem key={task.id} task={task} />;
				});
			return (
				<List divided relaxed>
					{taskList}
				</List>
			);
		} else if (filterOption === 'Completed') {
			const taskList = tasks
				.filter((task) => task.finished)
				.map((task) => {
					return <TaskItem key={task.id} task={task} />;
				});
			return (
				<List divided relaxed>
					{taskList}
				</List>
			);
		}
	};

	return (
		<div className='wrapper'>
			{renderAddForm()}
			{renderFilter()}
			{taskLoading && (
				<Loader active inline='centered'>
					Loading...
				</Loader>
			)}
			{message.isOpen && (
				<Message
					negative={message.type === 'negative'}
					positive={message.type === 'positive'}
					warning={message.type === 'warning'}
					content={message.content ? message.content : null}
				/>
			)}
			{tasks !== null && tasks.length === 0 && (
				<Message
					warning
					content="You don't have any task to do! Please create one!"
				/>
			)}
			{tasks && renderTaskList()}
		</div>
	);
}

export default HomePage;
