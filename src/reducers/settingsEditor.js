
import { 
	FETCH_SETTINGS_API,
	CLOSE_SETTINGS_API,
	CLEAR_SETTINGS,
	ACTIVATE_SETTINGS_GROUP,
	EDIT_SETTINGS,
} from '../actions/settingsEditor';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

const initial = {
	settings: null,
	schema: null,
	searchIndex: null,
	searchResult: null,
	activeGroup: null,
};

export default function settingsEditor(state = initial, action) {
	switch (action.type) {
		case FETCH_SETTINGS_API.SUCCESS: {
			// console.log(action);
			const newState = {
				...state,
				settings: action.data.settings,
				schema: action.data.schema,
			};
			return newState;
		}
		// case SAVE_TRANSLATIONS_API.SUCCESS:
		case EDIT_SETTINGS: {
			// console.log(action);
			const { namespace, key, value } = action.data;
			return {
				...state,
				settings: {
					...state.settings,
					[namespace]: {
						...(state.settings && state.settings[namespace]),
						[key]: value,
					},
				},
			};
		}
		case ACTIVATE_SETTINGS_GROUP: {
			const { key } = action.data;
			const newState = {
				...state,
				activeGroup: key,
			};
			return newState;
		}
		case CLEAR_DATA:
		case CLOSE_SETTINGS_API.SUCCESS:
		case CLEAR_SETTINGS:
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return initial;
		default:
			return state;
	}
}
