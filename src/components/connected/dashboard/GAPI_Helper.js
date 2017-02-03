
const GA_VISITS = 'ga:visits';

const UP_CLASS = 'up';
const NEUTRAL_CLASS = '';
const DOWN_CLASS = 'down';
const DANGER_CLASS = 'danger';

export default {
	createDimensionRequest(gapi, property, dimension) {
		return gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: property,
						pageSize: 10000,
						dimensions: [
							{
								name: dimension,
							},
						],
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

	getMetricIndex(headerName, source) {
		return source.metricHeader.metricHeaderEntries.indexOf(source.metricHeader.metricHeaderEntries.filter(x => x.name === headerName)[0]);
	},

	getDimensionIndex(headerName, source) {
		return source.dimensions.indexOf(source.dimensions.filter(x => x === headerName)[0]);
	},

	sortArrayBySessions(array) {
		return array.sort((a, b) => {
			if (a.totalSessions > b.totalSessions) { return -1; }
			if (a.totalSessions < b.totalSessions) { return 1; }
			return 0;
		});
	},

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

	formatSessionDuration(sessionDuration) {
		const avgSessionMinutes = Math.floor(sessionDuration / 60);
		const avgSessionSeconds = Math.round(sessionDuration % 60);
		return `${avgSessionMinutes}:${avgSessionSeconds < 10 ? `0${avgSessionSeconds}` : avgSessionSeconds}`;
	},

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
