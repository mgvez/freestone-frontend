import { combineReducers } from 'redux';

import { SET_PREVIEW_WIDTH } from '../actions/contentBlockPreview';


export function previewSettings(state = {}, action) {
	switch (action.type) {
	case SET_PREVIEW_WIDTH: {
		const newState = {
			...state,
			ratio: action.data.ratio,
		};
		return newState;
	}
	default:
		return state;
	}
}

export default combineReducers({
	previewSettings,
});
