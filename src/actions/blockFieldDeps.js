import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';


export const BLOCK_FIELD_DEPS_API = createRequestTypes('BLOCK_FIELD_DEPS_API');
export const SAVE_BLOCK_FIELD_DEPS_API = createRequestTypes('SAVE_BLOCK_FIELD_DEPS_API');
export const CLOSE_BLOCK_FIELD_DEPS_API = createRequestTypes('CLOSE_BLOCK_FIELD_DEPS_API');
export const SET_BLOCK_FIELD_DEP = 'SET_BLOCK_FIELD_DEP';
export const SET_BLOCK_MULTIPLE_FIELD_DEP = 'SET_BLOCK_MULTIPLE_FIELD_DEP';
export const CLEAR_BLOCK_FIELD_DEP = 'CLEAR_BLOCK_FIELD_DEP';
export const FINISH_SAVE_BLOCK_FIELD_DEP = 'FINISH_SAVE_BLOCK_FIELD_DEP';


export function fetchAllData() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BLOCK_FIELD_DEPS_API,
				route: 'blockFieldDeps/getValues',
			},
		});
	};
}

export function setSingleDependency(fieldId, typeId, data) {
	return (dispatch) => {
		return dispatch({
			type: SET_BLOCK_FIELD_DEP,
			data: {
				fieldId,
				typeId,
				...data,
			},
		});
	};
}

export function setMultipleDependencies(data) {
	return (dispatch) => {
		return dispatch({
			type: SET_BLOCK_MULTIPLE_FIELD_DEP,
			data,
		});
	};
}

export function clearDependencies() {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_BLOCK_FIELD_DEP,
		});
	};
}

export function saveDependencies(dependencies, setMessage, onFinish) {
	const data = { data: JSON.stringify(dependencies) };

	return (dispatch) => {
		setMessage('Saving...');
		const onSaved = dispatch({
			[FREESTONE_API]: {
				types: SAVE_BLOCK_FIELD_DEPS_API,
				route: 'blockFieldDeps/save',
				data,
			},
		});

		return onSaved.then(res => {
			setMessage('Dependencies saved');
			return new Promise(resolve => {
				setTimeout(() => resolve(res), 2000);
			});
		}).then(res => {
			onFinish();
			return dispatch({
				type: FINISH_SAVE_BLOCK_FIELD_DEP,
			});
		});

	};
}

export function closeDependencies() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: CLOSE_BLOCK_FIELD_DEPS_API,
				route: 'blockFieldDeps/unlock',
			},
		});
	};
}
