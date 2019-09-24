import { combineReducers } from 'redux';
import { SAVE_SUCCESS, SAVE_ERROR, SAVE_PROCESSING, SAVE_IDLE } from '../freestone/codes';
import { CLEAR_ERRORS, CLEAR_DATA } from '../actions/dev';
import { SAVE_RECORD_API, INIT_SAVE, SAVE_PREVIEW_API, PROCESS_IMAGES_API } from '../actions/save';
import { FILE_API } from '../actions/sendFile';

function files(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case FILE_API.SUCCESS: {
		// console.log(action.data);
		const { tmpName, progress } = action.data;
		return {
			...state,
			[tmpName]: Math.ceil(progress * 100),
		};
	}
	case INIT_SAVE:
	case CLEAR_DATA:
	case CLEAR_ERRORS:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function optimization(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case PROCESS_IMAGES_API.SUCCESS: {
		const { n_remain, n_todo_total } = action.data;
		return {
			...state,
			n_remain,
			n_todo_total,
		};
	}
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
	case SAVE_RECORD_API.REQUEST:
	case SAVE_PREVIEW_API.REQUEST:
		return {
			code: SAVE_PROCESSING,
			msg: 'Saving record...',
			error: null,
		};
	case SAVE_RECORD_API.SUCCESS:
	case SAVE_PREVIEW_API.SUCCESS:
		return {
			code: SAVE_SUCCESS,
			msg: 'Record saved',
			error: null,
		};
	case SAVE_RECORD_API.FAILURE:
	case SAVE_PREVIEW_API.FAILURE:
		// console.log(action);
		return {
			code: SAVE_ERROR,
			msg: 'Record save error',
			error: action.error.response || action.error.responseText,
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
	optimization,
	status,
});
