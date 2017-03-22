
export const THUMBNAIL_SIZE = 200;
export const MAX_TAB_LABEL_LENGTH = 30;

//how many seconds a record can be open on the front-end and still considered "safe". Should be the same as lock time on the backend
export const RECORD_LOADED_SAFE_LIFE = 3600;

//how much time max can the app be idle between API calls (to make sure session is still open)
export const MAX_TIME_BETWEEN_API_CALLS = 3600;

export function getWebsiteUrl() {
	let hostname = window.location.hostname;
	if (hostname === 'localhost') {
		// hostname = 'celeste.freestone-2';
		hostname = 'freestone_dev.freestone-2';
	}
	return `${window.location.protocol}//${hostname}`;
}

