import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchVariable } from 'actions/env';

const PAST_MONTH_REQUEST_ID = 'pastMonth';
const CURRENT_MONTH_REQUEST_ID = 'currentMonth';
const BROWSER_REQUEST_ID = 'browserRequest';
const DEVICE_REQUEST_ID = 'deviceRequest';
const OS_REQUEST_ID = 'osRequest';
const MEDIUM_REQUEST_ID = 'mediumRequest';
const SOCIAL_REQUEST_ID = 'socialRequest';

@connect(
	state => { 
		if (!state.envVariables.api_google) return {};
		return {
			...state.envVariables.api_google,
			gapi_token_access: state.auth.gapi_token_access,
		};
	},
	dispatch => bindActionCreators({ fetchVariable }, dispatch)
)
export class GoogleAnalytics extends Component {
	static propTypes = {
		clientId: React.PropTypes.string,
		property: React.PropTypes.string,
		gapi_token_access: React.PropTypes.string,

		// dbg: React.PropTypes.number,
		fetchVariable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			gaInfos: undefined,
		};
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentDidMount() {
		this.renderAnalytics();
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	componentDidUpdate() {
		//this.renderAnalytics();
	}

	requireData(props) {
		if (typeof props.clientId === 'undefined') this.props.fetchVariable('api.google');
	}

	renderAnalyticsTimeline() {
		console.log('Render analytics timeline', this.props.property);
		const property = this.props.property || '84012906';
		const gapi = window.gapi;

		const batch = gapi.client.newBatch();
		//v4
		// gapi.client.analyticsreporting.reports.batchGet({
		const browserRequest = gapi.client.request({
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
								name: 'ga:browser',
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

		const deviceRequest = gapi.client.request({
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
								name: 'ga:deviceCategory',
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

		const osRequest = gapi.client.request({
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
								name: 'ga:operatingSystem',
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

		const mediumRequest = gapi.client.request({
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
								name: 'ga:medium',
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

		const socialNetworkRequest = gapi.client.request({
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
								name: 'ga:socialNetwork',
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

		const pastMonthRequest = gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: property,
						pageSize: 10000,
						metrics: [
							{
								expression: 'ga:sessions',
							},
							{
								expression: 'ga:avgSessionDuration',
							},
							{
								expression: 'ga:pageviews',
							},
						],
						dateRanges: [
							{
								startDate: '60daysAgo',
								endDate: '30daysAgo',
							},
						],
					},
				],
			},
		});

		const currentMonthRequest = gapi.client.request({
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
								name: 'ga:pagePath',
							},
							{
								name: 'ga:exitPagePath',
							},
						],
						metrics: [
							{
								expression: 'ga:sessions',
							},
							{
								expression: 'ga:avgSessionDuration',
							},
							{
								expression: 'ga:pageviews',
							},
							{
								expression: 'ga:percentNewSessions',
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

		batch.add(pastMonthRequest, { id: PAST_MONTH_REQUEST_ID });
		batch.add(currentMonthRequest, { id: CURRENT_MONTH_REQUEST_ID });
		batch.add(browserRequest, { id: BROWSER_REQUEST_ID });
		batch.add(deviceRequest, { id: DEVICE_REQUEST_ID });
		batch.add(osRequest, { id: OS_REQUEST_ID });
		batch.add(mediumRequest, { id: MEDIUM_REQUEST_ID });
		batch.add(socialNetworkRequest, { id: SOCIAL_REQUEST_ID });

		batch.then((res) => {
			this.setState({
				currentMonthData: res.result[CURRENT_MONTH_REQUEST_ID].result.reports[0],
				pastMonthData: res.result[PAST_MONTH_REQUEST_ID].result.reports[0],
				browserData: res.result[BROWSER_REQUEST_ID].result.reports[0],
				deviceData: res.result[DEVICE_REQUEST_ID].result.reports[0],
				osData: res.result[OS_REQUEST_ID].result.reports[0],
				mediumData: res.result[MEDIUM_REQUEST_ID].result.reports[0],
				socialNetworkData: res.result[SOCIAL_REQUEST_ID].result.reports[0],
			});/**/
		}, (err) => {
			console.log(err);	
		});
	}

	renderAnalytics() {
		const gapi = window.gapi;
		if (!gapi || !this.props.clientId || !this.props.gapi_token_access) return undefined;
		// this.renderAnalyticsTimeline();
		// console.log(gapi);
		gapi.load('analytics', () => {

			const analytics = gapi.analytics;
			// console.log('render analytics...');
			analytics.ready(() => {
				// console.log('analytics ready');
				// console.log(gapi);
				if (analytics.auth.isAuthorized()) {
					// console.log('authorized');
					this.renderAnalyticsTimeline();
					return undefined;
				}
				
				analytics.auth.on('success', (a) => {
					this.renderAnalyticsTimeline();
				});
				// console.log('authorizing analytics with', this.props.gapi_token_access);
				analytics.auth.authorize({
					serverAuth: {
						access_token: this.props.gapi_token_access,
					},
					scopes: [
						'https://www.googleapis.com/auth/analytics.readonly',
					],
				});
				
			});
		});
	}
	

	render() {

		let gaInfos;
		if (this.state.currentMonthData) {

			const GAPI_HELPER = {
				
			};

			const getMetricIndex = (headerName, source) => {
				return source.metricHeader.metricHeaderEntries.indexOf(source.metricHeader.metricHeaderEntries.filter(x => x.name === headerName)[0]);
			};

			const getDimensionIndex = (headerName, source) => {
				return source.dimensions.indexOf(source.dimensions.filter(x => x === headerName)[0]);
			};

			const sortArrayBySessions = (array) => {
				return array.sort((a, b) => {
					if (a.totalSessions > b.totalSessions) { return -1; }
					if (a.totalSessions < b.totalSessions) { return 1; }
					return 0;
				});
			};

			const formatSimpleData = (data, headers, gaTag, totalSessions) => {
				return sortArrayBySessions(data.rows.map((row) => {
					const sessions = parseInt(row.metrics[0].values[getMetricIndex('ga:visits', headers)], 10);

					return {
						name: row.dimensions[getDimensionIndex(gaTag, headers)],
						totalSessions: sessions,
						sessionPercentage: Math.round(sessions / totalSessions * 100),
					};
				}));
			};

			const formatSessionDuration = (sessionDuration) => {
				const avgSessionMinutes = Math.floor(sessionDuration / 60);
				const avgSessionSeconds = Math.round(sessionDuration % 60);
				return `${avgSessionMinutes}:${avgSessionSeconds < 10 ? `0${avgSessionSeconds}` : avgSessionSeconds}`;
			};

			const getClassFromDelta = (delta) => {
				if (delta > 0) {
					return 'up';
				} else if (delta < 0 && delta > -25) {
					return 'down';
				} else if (delta < 0 && delta <= -25) {
					return 'danger';
				}
				
				return '';
			};
			
			/**
			 * Current and past month specific numbers
			 */
			const currentMonthData = this.state.currentMonthData.data;
			const currentMonthHeaders = this.state.currentMonthData.columnHeader;

			const pastMonthData = this.state.pastMonthData.data;
			const pastMonthHeaders = this.state.pastMonthData.columnHeader;

			const totalPageViews = currentMonthData.totals[0].values[getMetricIndex('ga:pageviews', currentMonthHeaders)];
			const totalSessions = currentMonthData.totals[0].values[getMetricIndex('ga:sessions', currentMonthHeaders)];
			const percentNewSessions = Math.round(currentMonthData.totals[0].values[getMetricIndex('ga:percentNewSessions', currentMonthHeaders)]);
			const averageSessionDuration = currentMonthData.totals[0].values[getMetricIndex('ga:avgSessionDuration', currentMonthHeaders)];
			const formattedAvgSessionDuration = formatSessionDuration(averageSessionDuration);
			// const mostExitedPagePath = currentMonthData.totals[0].values[getMetricIndex('ga:exitPagePath')];

			const pastTotalPageViews = pastMonthData.totals[0].values[getMetricIndex('ga:pageviews', pastMonthHeaders)];
			const pastTotalSessions = pastMonthData.totals[0].values[getMetricIndex('ga:sessions', pastMonthHeaders)];
			const pastAverageSessionDuration = pastMonthData.totals[0].values[getMetricIndex('ga:avgSessionDuration', pastMonthHeaders)];

			const deltaPageViews = Math.round((totalPageViews - pastTotalPageViews) / pastTotalPageViews * 100);
			const deltaSessions = Math.round((totalSessions - pastTotalSessions) / pastTotalSessions * 100);
			const deltaAvgSessionDuration = Math.round((averageSessionDuration - pastAverageSessionDuration) / pastAverageSessionDuration * 100);


			/**
			 * 
			 */

			const browserData = this.state.browserData.data;
			const browserHeaders = this.state.browserData.columnHeader;

			const deviceData = this.state.deviceData.data;
			const deviceHeaders = this.state.deviceData.columnHeader;

			const osData = this.state.osData.data;
			const osHeaders = this.state.osData.columnHeader;
			
			const mediumData = this.state.mediumData.data;
			const mediumHeaders = this.state.mediumData.columnHeader;
			
			const socialNetworkData = this.state.socialNetworkData.data;
			const socialNetworkHeaders = this.state.socialNetworkData.columnHeader;/** */

			const browserList = formatSimpleData(browserData, browserHeaders, 'ga:browser', totalSessions).map((row) => {
				row.cssClass = '';
				if (row.name.toLowerCase().indexOf('chrome') > -1) {
					row.cssClass = 'chrome';
				} else if (row.name.toLowerCase().indexOf('firefox') > -1) {
					row.cssClass = 'firefox';
				} else if (row.name.toLowerCase().indexOf('safari') > -1) {
					row.cssClass = 'safari';
				} else if (row.name.toLowerCase().indexOf('explorer') > -1) {
					row.cssClass = 'internet-explorer';
				} else if (row.name.toLowerCase().indexOf('edge') > -1) {
					row.cssClass = 'edge';
				}

				return row;
			}).slice(0, 3);

			const deviceList = formatSimpleData(deviceData, deviceHeaders, 'ga:deviceCategory', totalSessions).slice(0, 3);
			const osList = formatSimpleData(osData, osHeaders, 'ga:operatingSystem', totalSessions).slice(0, 3);
			const sourceList = formatSimpleData(mediumData, mediumHeaders, 'ga:medium', totalSessions).map((row) => {
				row.name = row.name === '(none)' ? 'Direct' : row.name;
				return row;
			}).slice(0, 3);
			const socialRefList = formatSimpleData(socialNetworkData, socialNetworkHeaders, 'ga:socialNetwork', totalSessions).filter(ref => ref.name !== '(not set)').slice(0, 3);

			gaInfos = (
				<div>
					<section className="padded-content analytics-section summary">
						<h2>Résumé du traffic du site</h2>

						<div className="summary-items">
							<div className="summary-item page-views">
								<div className="number">
									<i className="fa fa-eye"></i>
									<strong>{totalPageViews}</strong>
								</div>
								<div className="infos">
									<div className="name">Page views</div>
									<div className={`modifier ${getClassFromDelta(deltaPageViews)}`}><i></i>{deltaPageViews}%</div>
									<div className={`modifier-period ${getClassFromDelta(deltaPageViews)}`}>Derniers 30 jours</div>
								</div>
							</div>

							<div className="summary-item sessions">
								<div className="number">
									<i className="fa fa-desktop"></i>
									<strong>{totalSessions}</strong>
								</div>
								<div className="infos">
									<div className="name">Sessions</div>
									<div className={`modifier ${getClassFromDelta(deltaSessions)}`}><i></i>{deltaSessions}%</div>
									<div className={`modifier-period ${getClassFromDelta(deltaSessions)}`}>Derniers 30 jours</div>
								</div>
							</div>

							<div className="summary-item avg-time">
								<div className="number">
									<i className="fa fa-clock-o"></i>
									<strong>{formattedAvgSessionDuration}</strong>
								</div>
								<div className="infos">
									<div className="name">Temps moy.</div>
									<div className={`modifier ${getClassFromDelta(deltaAvgSessionDuration)}`}><i></i>{deltaAvgSessionDuration}%</div>
									<div className={`modifier-period ${getClassFromDelta(deltaAvgSessionDuration)}`}>Derniers 30 jours</div>
								</div>
							</div>
						</div>
					</section>

					<section className="padded-content analytics-section browsers">
						<h2>Navigateurs utilisés</h2>

						<div className="browsers-list">
							{
								browserList.map((browser) => {
									return (
										<div className={`browser ${browser.cssClass}`}>
											<div className="percentage">
												<i className={`fa fa-${browser.cssClass}`}></i>{browser.sessionPercentage}%
											</div>
											<div className="name">{browser.name}</div>
										</div>
									);
								})
							}
						</div>
					</section>

					<section className="padded-content analytics-section platforms">
						<h2>Plateformes utilisées par vos utilisateurs</h2>

						<div className="graphs">
							<div className="graph">
								<h2>Type d'appareil utilisé</h2>

								{
									deviceList.map((device) => {
										return (
											<div className="data">
												<div className="name">{device.name}</div>
												<div className="line" data-value={device.totalSessions}>
													<div className="span" style={{ width: `${device.sessionPercentage}%` }}></div>
												</div>
											</div>
										);
									})
								}
							</div>

							<div className="graph">
								<h2>Système d'exploitation</h2>

								{
									osList.map((os) => {
										return (
											<div className="data">
												<div className="name">{os.name}</div>
												<div className="line" data-value={os.totalSessions}>
													<div className="span" style={{ width: `${os.sessionPercentage}%` }}></div>
												</div>
											</div>
										);
									})
								}
							</div>
						</div>
					</section>

					<section className="padded-content analytics-section infographies">
						<h2>Infographie des visites</h2>
						
						<div className="graphs">
							<div className="column">
								<div className="graph round">
									<div className={`c100 p${percentNewSessions}`}>
										<div className="slice">
											<div className="bar"></div>
											<div className="fill"></div>
										</div>
									</div>

									<div className="legend">
										<div className="legend-item highlight">
											<div className="color"></div>
											<div className="name">Nouveaux visiteurs</div>
											<div className="value">{percentNewSessions}%</div>
										</div>
										
										<div className="legend-item">
											<div className="color"></div>
											<div className="name">Anciens visiteurs</div>
											<div className="value">{100 - percentNewSessions}%</div>
										</div>
									</div>
								</div>
							</div>
							<div className="column">
								<div className="graph">
									<h2>Source du traffic</h2>

									{
										sourceList.map((source) => {
											return (
												<div className="data">
													<div className="name">{source.name}</div>
													<div className="line" data-value={source.totalSessions}>
														<div className="span" style={{ width: `${source.sessionPercentage}%` }}></div>
													</div>
												</div>
											);
										})
									}
								</div>

								<div className="graph">
									<h2>Réseaux sociaux</h2>

									{
										socialRefList.map((socialRef) => {
											return (
												<div className="data">
													<div className="name">{socialRef.name}</div>
													<div className="line" data-value={socialRef.totalSessions}>
														<div className="span" style={{ width: `${socialRef.sessionPercentage}%` }}></div>
													</div>
												</div>
											);
										})
									}
								</div>
							</div>
						</div>
					</section>
				</div>
			);
		}

		return (
			<section data-id={this.props.clientId} className="analytics">
				{gaInfos}
			</section>
		);
	}
}
