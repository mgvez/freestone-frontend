
import { ajax } from './ajax';

function addFreestone(data) {
	return {
		type: 'ADD_FREESTONE',
		data,
	};
}

export function fetchFreestone() {
	return (dispatch) => {
		// console.log(dispatch);
		return ajax('main', {})(dispatch)
		.then((data) => {
			dispatch(addFreestone(data));
		});
	};
}
