import { combineReducers } from 'redux';

export function files(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case 'SEND_FILE':
		// console.log(action.data);
		const { tmpName, progress } = action.data;
		return {
			...state,
			[tmpName]: Math.ceil(progress * 100),
		};
	case 'INIT_SAVE':
	case 'CLEAR_DATA':
	case 'CLEAR_ERRORS':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

export default combineReducers({
	files,
});
