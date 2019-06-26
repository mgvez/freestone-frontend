
export const THUMBNAIL_SIZE = 300;

export const MAX_TAB_LABEL_LENGTH = 30;
const PROD_FREESTONE_LOCATION = '';

//how many seconds a record can be open on the front-end and still considered "safe". Should be the same as lock time on the backend
export const RECORD_LOADED_SAFE_LIFE = 3600;

//when we are placing values, for example bank images, in fields, we need a temporary placeholder which will be replaced by the selection
export const PLACEHOLDER = '{{placeholder}}';

//how much time max can the app be idle between API calls (to make sure session is still open)
export const MAX_TIME_BETWEEN_API_CALLS = 3600;
// export const MAX_TIME_BETWEEN_API_CALLS = 5;

let websiteUrl;
export function getProtocol() {
	return window.location.port === '3000' ? 'http:' : window.location.protocol;
}

export function getWebsiteUrl() {
	if (websiteUrl) return websiteUrl;
	let { hostname, pathname } = window.location;

	pathname = pathname.substr(0, pathname.indexOf('admin/'));

	if (hostname === 'localhost') {
		hostname = 'freestone_dev.freestone-2';
	} else {
		hostname = `${hostname}${PROD_FREESTONE_LOCATION}`;
	}

	const protocol = getProtocol();

	websiteUrl = `${protocol}//${hostname}${pathname}`;
	// console.log(websiteUrl);
	if (websiteUrl[websiteUrl.length - 1] !== '/') websiteUrl += '/';
	return websiteUrl;
}

