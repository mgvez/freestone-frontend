export const MODAL_TRANSITION_MS = 150;

const overlay = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(255, 255, 255, 0.5)',
	zIndex: 10000,
};

export default {
	overlay,
	content: {
		position: 'absolute',
		top: '20px',
		left: '20px',
		right: '20px',
		bottom: '20px',
		border: 'none',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '0',
		outline: 'none',
		padding: '20px',
		zIndex: 10000,
		boxShadow: '0px 0px 65px -26px rgb(0 0 0 / 50%)',
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

export const url_helper = {
	overlay,
	content: {
		position: 'absolute',
		top: '20px',
		left: '20px',
		right: '20px',
		bottom: '20px',
		border: 'none',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '0',
		outline: 'none',
		padding: '20px',
		zIndex: 10000,
		boxShadow: '0px 0px 65px -26px rgb(0 0 0 / 50%)',
	},
};
