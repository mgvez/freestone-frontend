
const GA_VISITS = 'ga:visits';

const UP_CLASS = 'up';
const NEUTRAL_CLASS = '';
const DOWN_CLASS = 'down';
const DANGER_CLASS = 'danger';

/**
 * @class GAPI_Helper
 * 
 * Helper for common uses of the Google Analytics API.
 */
export const GAPI_Helper = {
	/**
	 * @function createDimensionRequest
	 * 
	 * Creates a request for a dimension during the last 30 days
	 * 
	 * @param {Object} gapi The Google API Object
	 * @param {String} property The view ID of the analytics
	 * @param {String[]} dimensions The dimensions you wish to request data for.
	 * 
	 * @return {Object} ga.client.request() The request object	
	 */
	createDimensionRequest(gapi, property, dimensions) {
		return gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: property,
						pageSize: 10000,
						dimensions: dimensions.map(d => {
							return { name: d };
						}),
						dateRanges: [
							{
								startDate: '30daysAgo',
								endDate: 'yesterday',
							},
						],
					},
				],
			},
		});
	},

	/**
	 * @typedef {Object} GAPIDateRange A range of dates
	 * @property {String} startDate Start of the range (ex : '30daysAgo')
	 * @property {String} endDate End of the range (ex : 'yesterday')
	 */

	/**
	 * @function createMetricRequest
	 * 
	 * Creates a request for a dimension during the last 30 days
	 * 
	 * @param {Object} gapi The Google API Object
	 * @param {String} property The view ID of the analytics
	 * @param {String[]} metrics The metrics you wish to request data for.
	 * @param {GAPIDateRange[]} dateRanges The date ranges for the requested data.
	 * 
	 * @return {Object} ga.client.request() The request object	
	 */
	createMetricRequest(gapi, property, metrics, dateRanges) {
		return gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: property,
						pageSize: 10000,
						metrics: metrics.map(metric => {
							return { expression: metric };
						}),
						dateRanges,
					},
				],
			},
		});
	},

	/**
	 * @function getMetricIndex
	 * 
	 * Returns the index of a metric in the metrics object from its counterpart in the headers (source) object.
	 * 
	 * @param {String} headerName The name of the header property
	 * @param {Object} source The header object in which to look for
	 * 
	 * @return {String} index The index of the requested metric.
	 */
	getMetricIndex(headerName, source) {
		return source.metricHeader.metricHeaderEntries.indexOf(source.metricHeader.metricHeaderEntries.filter(x => x.name === headerName)[0]);
	},

	/**
	 * @function getDimensionIndex
	 * 
	 * Returns the index of a dimension in the dimensions object from its counterpart in the headers (source) object.
	 * 
	 * @param {String} headerName The name of the header property
	 * @param {Object} source The header object in which to look for
	 * 
	 * @return {String} index The index of the requested dimension.
	 */
	getDimensionIndex(headerName, source) {
		return source.dimensions.indexOf(source.dimensions.filter(x => x === headerName)[0]);
	},

	/**
	 * @typedef {Object} GAPIDataObject
	 * @property {Number} totalSessions The total number of sessions for this object
	 */

	/**
	 * @function sortArrayBySessions
	 * 
	 * Sorts an array by total sessions.
	 * 
	 * @param {GAPIDataObject[]} array The array of data to be sorted.
	 */
	sortArrayBySessions(array) {
		return array.sort((a, b) => {
			if (a.totalSessions > b.totalSessions) { return -1; }
			if (a.totalSessions < b.totalSessions) { return 1; }
			return 0;
		});
	},

	/**
	 * @typedef {Object} RawGAPIData
	 * @property {Object[]} rows The rows of a raw GAPI object
	 */
	
	/**
	 * @function formatSimpleData
	 * 
	 * Formats every row of a dimension data object in an array of objects that have 
	 * the same default useful properties. Then sorts the array by number of sessions 
	 * before returning it.
	 * 
	 * @param {RawGAPIData} data The data to be formatted
	 * @param {Object} headers The headers object#
	 * @param {String} gaTag The GA tag for the dimension (ex: 'ga:pageTitle')
	 * @param {Number} totalSessions The total number of sessions for the whole property
	 * 
	 * @return {Array}
	 */
	formatSimpleData(data, headers, gaTag, totalSessions) {
		return this.sortArrayBySessions(data.rows.map((row) => {
			const sessions = parseInt(row.metrics[0].values[this.getMetricIndex(GA_VISITS, headers)], 10);

			return {
				name: row.dimensions[this.getDimensionIndex(gaTag, headers)],
				totalSessions: sessions,
				sessionPercentage: Math.round(sessions / totalSessions * 100),
			};
		}));
	},

	/**
	 * @function formatSessionDuration
	 * 
	 * Formats a time into a readable string
	 * 
	 * @param {Number} sessionDuration Time in seconds
	 * 
	 * @return {String}
	 */
	formatSessionDuration(sessionDuration) {
		const avgSessionMinutes = Math.floor(sessionDuration / 60);
		const avgSessionSeconds = Math.round(sessionDuration % 60);
		return `${avgSessionMinutes}:${avgSessionSeconds < 10 ? `0${avgSessionSeconds}` : avgSessionSeconds}`;
	},

	/**
	 * @function getClassFromDelta
	 * 
	 * Returns a CSS Class depending on the difference between two numbers.
	 * 
	 * @param {Number} delta A difference between two numbers
	 * 
	 * @return {String}
	 */
	getClassFromDelta(delta) {
		if (delta > 0) {
			return UP_CLASS;
		} else if (delta < 0 && delta > -25) {
			return DOWN_CLASS;
		} else if (delta < 0 && delta <= -25) {
			return DANGER_CLASS;
		}
		
		return NEUTRAL_CLASS;
	},
};

export default GAPI_Helper;
