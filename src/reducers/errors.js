import { CLEAR_ERRORS } from 'actions/errors';
import { FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function errors(state = [], action) {
	// console.log(action);
	switch (action.type) {
	case FREESTONE_API_FAILURE:
		return [
			// ...state,
			{
				message: action.error.responseText || action.error.statusText || action.error.response,
				details: action.error.details,
			},
		];
		// console.log(action.error);
	//appelée en PLUS de API_FAILURE, donc n'a pas besoin d'ajouter l'erreur. Ne sert pas encore
	case FREESTONE_API_FATAL_FAILURE:
		return state;
	case CLEAR_ERRORS:
		return [];
	default:
		// console.log('no change');
		return state;
	}
}
