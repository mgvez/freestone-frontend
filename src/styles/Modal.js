export const MODAL_TRANSITION_MS = 150;

const overlay = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(255, 255, 255, 0.5)',
	zIndex: 3000,
};


export default {
	overlay,
	content: {
		position: 'absolute',
		top: '40px',
		left: '40px',
		right: '40px',
		bottom: '40px',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: '20px',
	},
};

export const transparentModal = {
	overlay,
	content: {
		position: 'absolute',
		top: '40px',
		left: '40px',
		right: '40px',
		bottom: '40px',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		border: 0,
		background: 'none',
		outline: 'none',
		padding: '20px',
		color: 'black',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
};
