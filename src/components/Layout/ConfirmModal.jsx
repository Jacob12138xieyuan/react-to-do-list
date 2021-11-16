import { Button, Icon, Modal } from 'semantic-ui-react';

function ConfirmModal({ message, color, onConfirm, onClose }) {
	return (
		<Modal closeIcon open={true} onClose={onClose}>
			<Modal.Content>
				<p>{message}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button color='blue' onClick={onClose}>
					<Icon name='remove' /> No
				</Button>
				<Button color={color} onClick={onConfirm}>
					<Icon name='checkmark' /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

export default ConfirmModal;
