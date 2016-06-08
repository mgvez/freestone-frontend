
export const MAX_TAB_LABEL_LENGTH = 30;

export function getWebsiteUrl() {
	let hostname = window.location.hostname;
	if (hostname === 'localhost') {
		// hostname = 'celeste.freestone-2';
		hostname = 'freestone_dev.freestone-2';
	}
	return `${window.location.protocol}//${hostname}`;
}

export function getApiUrl() {
	return getWebsiteUrl() + '/api';
}
