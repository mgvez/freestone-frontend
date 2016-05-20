import { combineReducers } from 'redux';
import { SAVE_SUCCESS, SAVE_ERROR, SAVE_PROCESSING, SAVE_IDLE } from 'freestone/codes';
import { CLEAR_ERRORS, CLEAR_DATA } from 'actions/dev';
import { SAVE_RECORD_REQUEST, SAVE_RECORD_SUCCESS, SAVE_RECORD_ERROR, INIT_SAVE } from 'actions/save';
import { SEND_FILE } from 'actions/send-file';

function files(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case SEND_FILE:
		// console.log(action.data);
		const { tmpName, progress } = action.data;
		return {
			...state,
			[tmpName]: Math.ceil(progress * 100),
		};
	case INIT_SAVE:
	case CLEAR_DATA:
	case CLEAR_ERRORS:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

const statusDefault = {
	code: SAVE_IDLE,
	msg: '...',
	error: null,
};
function status(state = statusDefault, action) {
	switch (action.type) {
	case SAVE_RECORD_REQUEST:
		return {
			code: SAVE_PROCESSING,
			msg: 'saving record',
			error: null,
		};
	case SAVE_RECORD_SUCCESS:
		return {
			code: SAVE_SUCCESS,
			msg: 'record saved',
			error: null,
		};
	case SAVE_RECORD_ERROR:
		return {
			code: SAVE_ERROR,
			msg: 'record save error',
			error: null,
		};
	case INIT_SAVE:
	case CLEAR_DATA:
	case CLEAR_ERRORS:
		return statusDefault;
	default:
		// console.log('no change');
		return state;
	}
}

export default combineReducers({
	files,
	status,
});
