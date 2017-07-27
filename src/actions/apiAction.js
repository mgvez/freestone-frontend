

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const REFRESH_DATA = 'REFRESH_DATA';


export function createRequestTypes(base) {
	return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`;
		return acc;
	}, {});
}

export function action(type, payload = {}) {
	return { type, ...payload };
}
