import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
import { SavedFileInput } from 'freestone/FileInputs';
import uniqueId from 'utils/UniqueId';

const CHUNK_SIZE = 100 * 1024;

function sendChunk(dispatch, file, tmpName, rangeStart) {
	let rangeEnd = rangeStart + CHUNK_SIZE;
	if (rangeEnd > file.size) {
		rangeEnd = file.size;
	}
	const chunk = file.slice(rangeStart, rangeEnd);
	// console.log(rangeStart);
	
	const data = new FormData();
	// data.append('file', file);
	data.append('chunk', chunk);
	data.append('name', file.name);
	data.append('totalSize', file.size);
	data.append('currentSize', rangeEnd);
	data.append('tmpName', tmpName);

	const chunkReqAction = dispatch({
		[FREESTONE_API]: {
			types: [null, 'SEND_FILE', FREESTONE_API_FATAL_FAILURE],
			route: `file`,
			data,
		},
	});

	if (rangeEnd === file.size) {
		return chunkReqAction;
	}

	return chunkReqAction.then(() => sendChunk(dispatch, file, tmpName, rangeEnd));
}

export function sendFile(fieldId, recordId) {
	return (dispatch) => {

		const savedInput = new SavedFileInput(fieldId, recordId);
		const inp = savedInput.getInput();
		if (!inp) return null;

		return sendChunk(dispatch, inp.files[0], uniqueId(), 0);
	};
}
