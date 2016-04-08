import Perf from 'react-addons-perf';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CLEAR_DATA = 'CLEAR_DATA';
export const PERF_START = 'PERF_START';
export const PERF_STOP = 'PERF_STOP';

export function clearErrors() {
	return {
		type: CLEAR_ERRORS,
	};
}


export function clearData() {
	return {
		type: CLEAR_DATA,
	};
}

export function startPerf() {
	Perf.start();
	return {
		type: PERF_START,
	};
}

export function stopPerf() {
	Perf.stop();
	const m = Perf.getLastMeasurements();
	Perf.printInclusive(m);
	Perf.printWasted(m);
	return {
		type: PERF_STOP,
	};
}
