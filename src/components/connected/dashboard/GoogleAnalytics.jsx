import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchVariable } from 'actions/env';

const PAST_MONTH_REQUEST_ID = 'pastMonth';
const CURRENT_MONTH_REQUEST_ID = 'currentMonth';

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
		const pastMonthRequest = gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: property,
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
						dimensions: [
							{
								name: 'ga:browser',
							},
							{
								name: 'ga:deviceCategory',
							},
							{
								name: 'ga:operatingSystem',
							},
							{
								name: 'ga:medium',
							},
							{
								name: 'ga:socialNetwork',
							},
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

		batch.then((res) => {
			this.setState({
				currentMonthData: res.result[`${CURRENT_MONTH_REQUEST_ID}`].result.reports[0],
				pastMonthData: res.result[PAST_MONTH_REQUEST_ID].result.reports[0],
				//gaInfosPast: res.result.reports[1],
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

			const currentMonthData = this.state.currentMonthData.data;
			const currentMonthHeaders = this.state.currentMonthData.columnHeader;

			const pastMonthData = this.state.pastMonthData.data;
			const pastMonthHeaders = this.state.pastMonthData.columnHeader;

			const getMetricIndex = (headerName, source = currentMonthHeaders) => {
				return source.metricHeader.metricHeaderEntries.indexOf(source.metricHeader.metricHeaderEntries.filter(x => x.name === headerName)[0]);
			};

			const getDimensionIndex = (headerName, source = currentMonthHeaders) => {
				return source.dimensions.indexOf(source.dimensions.filter(x => x === headerName)[0]);
			};

			const getArrayFromMap = (map) => {
				return Array.from(map).map((mapEntry) => {
					return {
						name: mapEntry[0],
						...mapEntry[1],
					};
				});
			};

			const sortArrayBySessions = (array) => {
				return array.sort((a, b) => {
					if (a.totalSessions > b.totalSessions) { return -1; }
					if (a.totalSessions < b.totalSessions) { return 1; }
					return 0;
				});
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
			
			const totalPageViews = currentMonthData.totals[0].values[getMetricIndex('ga:pageviews')];
			const totalSessions = currentMonthData.totals[0].values[getMetricIndex('ga:sessions')];
			const percentNewSessions = Math.round(currentMonthData.totals[0].values[getMetricIndex('ga:percentNewSessions')]);
			const averageSessionDuration = currentMonthData.totals[0].values[getMetricIndex('ga:avgSessionDuration')];
			const formattedAvgSessionDuration = formatSessionDuration(averageSessionDuration);
			// const mostExitedPagePath = currentMonthData.totals[0].values[getMetricIndex('ga:exitPagePath')];

			const pastTotalPageViews = pastMonthData.totals[0].values[getMetricIndex('ga:pageviews', pastMonthHeaders)];
			const pastTotalSessions = pastMonthData.totals[0].values[getMetricIndex('ga:sessions', pastMonthHeaders)];
			const pastAverageSessionDuration = pastMonthData.totals[0].values[getMetricIndex('ga:avgSessionDuration', pastMonthHeaders)];

			const deltaPageViews = Math.round((totalPageViews - pastTotalPageViews) / pastTotalPageViews * 100);
			const deltaSessions = Math.round((totalSessions - pastTotalSessions) / pastTotalSessions * 100);
			const deltaAvgSessionDuration = Math.round((averageSessionDuration - pastAverageSessionDuration) / pastAverageSessionDuration * 100);

			const browsers = new Map();
			const operatingSystems = new Map();
			const devices = new Map();
			const sources = new Map();
			const socialRefs = new Map();
			const exitPages = new Map();
			const viewedPages = new Map();
			currentMonthData.rows.forEach((row) => {
				const browserName = row.dimensions[getDimensionIndex('ga:browser')];
				const osName = row.dimensions[getDimensionIndex('ga:operatingSystem')];
				const deviceName = row.dimensions[getDimensionIndex('ga:deviceCategory')];
				const sourceName = row.dimensions[getDimensionIndex('ga:medium')];
				const socialNetwork = row.dimensions[getDimensionIndex('ga:socialNetwork')];
				const exitPagePath = row.dimensions[getDimensionIndex('ga:exitPagePath')];
				const pagePath = row.dimensions[getDimensionIndex('ga:pagePath')];
				const sessions = parseInt(row.metrics[0].values[getMetricIndex('ga:sessions')], 10);

				const exitPageObject = exitPages.get(exitPagePath) || { totalSessions: 0, sessionPercentage: 0 };
				exitPageObject.totalSessions += sessions;
				exitPageObject.sessionPercentage = Math.round(exitPageObject.totalSessions / totalSessions * 100);
				exitPages.set(exitPagePath, exitPageObject);

				const pageObject = viewedPages.get(pagePath) || { totalSessions: 0, sessionPercentage: 0 };
				pageObject.totalSessions += sessions;
				pageObject.sessionPercentage = Math.round(pageObject.totalSessions / totalSessions * 100);
				viewedPages.set(pagePath, pageObject);

				const browserObject = browsers.get(browserName) || { totalSessions: 0, sessionPercentage: 0 };
				browserObject.totalSessions += sessions;
				browserObject.sessionPercentage = Math.round(browserObject.totalSessions / totalSessions * 100);
				
				let cssClass = '';
				if (browserName.toLowerCase().indexOf('chrome') > -1) {
					cssClass = 'chrome';
				} else if (browserName.toLowerCase().indexOf('firefox') > -1) {
					cssClass = 'firefox';
				} else if (browserName.toLowerCase().indexOf('safari') > -1) {
					cssClass = 'safari';
				} else if (browserName.toLowerCase().indexOf('explorer') > -1) {
					cssClass = 'internet-explorer';
				} else if (browserName.toLowerCase().indexOf('edge') > -1) {
					cssClass = 'edge';
				}

				browserObject.cssClass = cssClass;
				browsers.set(browserName, browserObject);

				const osObject = operatingSystems.get(osName) || { totalSessions: 0, sessionPercentage: 0 };
				osObject.totalSessions += sessions;
				osObject.sessionPercentage = Math.round(osObject.totalSessions / totalSessions * 100);
				operatingSystems.set(osName, osObject);

				const deviceObject = devices.get(deviceName) || { totalSessions: 0, sessionPercentage: 0 };
				deviceObject.totalSessions += sessions;
				deviceObject.sessionPercentage = Math.round(deviceObject.totalSessions / totalSessions * 100);
				devices.set(deviceName, deviceObject);

				const sourceObject = sources.get(sourceName) || { totalSessions: 0, sessionPercentage: 0 };
				sourceObject.totalSessions += sessions;
				sourceObject.sessionPercentage = Math.round(sourceObject.totalSessions / totalSessions * 100);
				sources.set(sourceName, sourceObject);

				const socialRefObject = socialRefs.get(socialNetwork) || { totalSessions: 0, sessionPercentage: 0 };
				socialRefObject.totalSessions += sessions;
				socialRefObject.sessionPercentage = Math.round(socialRefObject.totalSessions / totalSessions * 100);
				socialRefs.set(socialNetwork, socialRefObject);
			});

			console.log(sortArrayBySessions(getArrayFromMap(browsers)));

			const browserList = sortArrayBySessions(getArrayFromMap(browsers)).slice(0, 3);
			const osList = sortArrayBySessions(getArrayFromMap(operatingSystems)).slice(0, 3);
			const deviceList = sortArrayBySessions(getArrayFromMap(devices)).slice(0, 3);
			const sourceList = sortArrayBySessions(
				getArrayFromMap(sources).map(source => {
					const s = { ...source };
					s.name = s.name === '(none)' ? 'Direct' : s.name;
					return s;
				})
			).slice(0, 3);
			const socialRefList = sortArrayBySessions(getArrayFromMap(socialRefs).filter(ref => ref.name !== '(not set)')).slice(0, 3);
			const mostExitedPagePath = sortArrayBySessions(getArrayFromMap(exitPages))[0];
			const mostViewedPagePath = sortArrayBySessions(getArrayFromMap(viewedPages))[0];

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

					<section className="padded-content analytics-section summary">
						<h2>Informations sur vos utilisateurs</h2>

						<div className="user-infos">
							<div className="user-infos-item">
								<div className="number">
									<i className="fa fa-eye"></i>
									<strong>{mostViewedPagePath.totalSessions}</strong>
								</div>
								<div className="infos">
									<div className="name">Page la plus visitée</div>
									<a href={`"${mostViewedPagePath.name}"`}>{mostViewedPagePath.name}</a>
								</div>
							</div>

							<div className="user-infos-item warn">
								<div className="number">
									<i className="fa fa-eye"></i>
									<strong>{mostExitedPagePath.totalSessions}</strong>
								</div>
								<div className="infos">
									<div className="name">Page la plus quittée</div>
									<a href={`"${mostExitedPagePath.name}"`}>{mostExitedPagePath.name}</a>
								</div>
							</div>
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
