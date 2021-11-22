import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	List,
	Checkbox,
	Popup,
	Form,
	Button,
	Icon,
	Message,
} from 'semantic-ui-react';
import { useState } from 'react';
import ConfirmModal from './Layout/ConfirmModal';
import taskService from '../services/TaskService';
import { taskActions } from '../redux_store/taskSlice';
import moment from 'moment';

const TaskItem = ({ task }) => {
	const dispatch = useDispatch();

	const [deleting, setDeleting] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editingName, setEditingName] = useState('');

	const [formMessage, setFormMessage] = useState({
		isOpen: false,
		content: '',
		type: '',
	});

	// When editing, auto focus
	const editNameRef = useRef();
	useEffect(() => {
		if (editing) editNameRef.current.focus();
	}, [editing]);

	const editFormSubmitHandler = (event) => {
		event.preventDefault();
		// Simple form validation
		if (editingName.trim() === '') {
			setFormMessage({
				isOpen: true,
				content: 'Name should not be empty!',
				type: 'negative',
			});
			return;
		}
		// put updated task
		taskService
			.updateTask({ id: task.id, name: editingName, finished: task.finished })
			.then((res) => {
				// update UI
				console.log('Update a task successfully');
				dispatch(taskActions.updateTask(res.data.data));
			})
			.catch(() => {
				setFormMessage({
					isOpen: true,
					content: 'Network error',
					type: 'negative',
				});
			})
			.finally(() => {
				setEditing(false);
				setEditingName('');
			});
	};

	const deleteConfirmHandler = () => {
		taskService
			.deleteTask(task.id)
			.then(() => {
				console.log('Deleted a task');
				setDeleting(false);
				dispatch(taskActions.deleteTask(task.id));
			})
			.catch(() => {
				setDeleting(false);
			});
	};

	const checkboxChangeHandler = () => {
		taskService
			.updateTask({ id: task.id, name: task.name, finished: !task.finished })
			.then((res) => {
				if ([200].includes(res.status)) {
					// update UI
					dispatch(taskActions.updateTask(res.data.data));
				}
			});
	};

	return (
		<List.Item>
			{/* If delete icon is clicked, show confirm modal */}
			{deleting && (
				<ConfirmModal
					message={`Are you sure delete task "${task.name}" which is ${
						task.finished ? 'finished' : 'not finished'
					}?`}
					color='red'
					onConfirm={deleteConfirmHandler}
					onClose={() => setDeleting(false)}
				/>
			)}

			<List.Content>
				{/* If finished state is true, render green chech */}
				{task.finished && (
					<List.Icon color='green' name='check' style={{ float: 'right' }} />
				)}
				<List.Header as='h3'>{task.name}</List.Header>
				<List.Description as='a'>
					Created at {moment(task.createDate, 'YYYY-MM-DDThh:mm:ss').fromNow()}
				</List.Description>
				<div style={{ marginTop: '15px', marginBottom: '15px' }}>
					{/* Delete icon */}
					<Popup
						content='Delete task'
						trigger={
							<List.Icon
								color='red'
								name='delete'
								link
								onClick={() => {
									setDeleting(true);
								}}
							/>
						}
					/>

					{/* Edit icon */}
					<Popup
						content='Edit task'
						trigger={
							<List.Icon
								color='black'
								name='edit'
								link
								// onClick change task editing status to conditionally show edit form
								onClick={() => {
									setEditing(true);
								}}
							/>
						}
					/>
					<Checkbox
						label='Mark as finished'
						checked={task.finished}
						onChange={checkboxChangeHandler}
					/>
				</div>
			</List.Content>

			{/* Conditionally rendered edit form */}
			{editing && (
				<Form onSubmit={editFormSubmitHandler}>
					<Form.Field>
						<input
							ref={editNameRef}
							placeholder='Change name to'
							// onChange change task editing name in local state
							onChange={(e) => setEditingName(e.target.value)}
							// dismiss error when focus again
							onFocus={() =>
								setFormMessage({
									isOpen: false,
									content: '',
									type: '',
								})
							}
							value={editingName}
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

					<Button type='submit' primary>
						<Icon name='save' />
						Save
					</Button>
					<Button
						type='button'
						color='red'
						// onClick cancel editing, change task editing status to false, edit form disappear
						onClick={() => {
							setEditing(false);
							setFormMessage({
								isOpen: false,
								content: '',
								type: '',
							});
						}}
					>
						<Icon name='cancel' />
						Cancel
					</Button>
				</Form>
			)}
		</List.Item>
	);
};

export default TaskItem;
