
import Perf from 'react-addons-perf';


export function clearErrors() {
	return {
		type: 'CLEAR_ERRORS',
	};
}


export function clearData() {
	return {
		type: 'CLEAR_DATA',
	};
}

export function startPerf() {
	Perf.start();
	return {
		type: 'PERF_START',
	};
}

export function stopPerf() {
	Perf.stop();
	const m = Perf.getLastMeasurements();
	Perf.printInclusive(m);
	Perf.printWasted(m);
	return {
		type: 'PERF_STOP',
	};
}
