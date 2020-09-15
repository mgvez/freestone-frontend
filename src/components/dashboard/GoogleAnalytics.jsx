import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GAPI_Helper from './GAPI_Helper';

const PAST_MONTH_REQUEST_ID = 'pastMonth';
const CURRENT_MONTH_REQUEST_ID = 'currentMonth';
const BROWSER_REQUEST_ID = 'browserRequest';
const DEVICE_REQUEST_ID = 'deviceRequest';
const OS_REQUEST_ID = 'osRequest';
const MEDIUM_REQUEST_ID = 'mediumRequest';
const SOCIAL_REQUEST_ID = 'socialRequest';
const PAGE_PATH_REQUEST_ID = 'pagePathRequest';
const EXIT_PAGE_REQUEST_ID = 'exitPageRequest';

const GA_BROWSER = 'ga:browser';
const GA_DEVICE = 'ga:deviceCategory';
const GA_OS = 'ga:operatingSystem';
const GA_MEDIUM = 'ga:medium';
const GA_SOCIAL = 'ga:socialNetwork';
const GA_PAGE_PATH = 'ga:pagePath';
const GA_EXIT_PAGE = 'ga:exitPagePath';
const GA_SESSIONS = 'ga:sessions';
const GA_AVG_SESSION_DURATION = 'ga:avgSessionDuration';
const GA_PAGEVIEWS = 'ga:pageviews';
const GA_PERCENT_NEW_SESSIONS = 'ga:percentNewSessions';

export default class GoogleAnalytics extends Component {
	static propTypes = {
		clientId: PropTypes.string,
		property: PropTypes.string,
		gapi_token_access: PropTypes.string,

		// dbg: PropTypes.number,
		fetchVariable: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			gaInfos: undefined,
		};
		this.requireData(this.props);
	}
	
	componentDidMount() {
		this.renderAnalytics();
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		if (typeof props.clientId === 'undefined') this.props.fetchVariable('api.google');
	}

	renderAnalyticsTimeline() {
		// console.log('Render analytics timeline', this.props.property);
		const property = this.props.property;// || '84012906';
		if (!property) return;
		const gapi = window.gapi;

		const batch = gapi.client.newBatch();

		const browserRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_BROWSER]);
		const deviceRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_DEVICE]);
		const osRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_OS]);
		const mediumRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_MEDIUM]);
		const socialNetworkRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_SOCIAL]);
		const pagePathRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_PAGE_PATH]);
		const exitPageRequest = GAPI_Helper.createDimensionRequest(gapi, property, [GA_EXIT_PAGE]);

		const pastMonthRequest = GAPI_Helper.createMetricRequest(gapi, property, [GA_SESSIONS, GA_AVG_SESSION_DURATION, GA_PAGEVIEWS], [{ startDate: '60daysAgo', endDate: '30daysAgo' }]);
		const currentMonthRequest = GAPI_Helper.createMetricRequest(gapi, property, [GA_SESSIONS, GA_AVG_SESSION_DURATION, GA_PAGEVIEWS, GA_PERCENT_NEW_SESSIONS], [{ startDate: '30daysAgo', endDate: 'yesterday' }]);

		batch.add(pastMonthRequest, { id: PAST_MONTH_REQUEST_ID });
		batch.add(currentMonthRequest, { id: CURRENT_MONTH_REQUEST_ID });
		batch.add(browserRequest, { id: BROWSER_REQUEST_ID });
		batch.add(deviceRequest, { id: DEVICE_REQUEST_ID });
		batch.add(osRequest, { id: OS_REQUEST_ID });
		batch.add(mediumRequest, { id: MEDIUM_REQUEST_ID });
		batch.add(socialNetworkRequest, { id: SOCIAL_REQUEST_ID });
		batch.add(pagePathRequest, { id: PAGE_PATH_REQUEST_ID });
		batch.add(exitPageRequest, { id: EXIT_PAGE_REQUEST_ID });

		batch.then((res) => {
			this.setState({
				currentMonthData: res.result[CURRENT_MONTH_REQUEST_ID].result.reports[0],
				pastMonthData: res.result[PAST_MONTH_REQUEST_ID].result.reports[0],
				browserData: res.result[BROWSER_REQUEST_ID].result.reports[0],
				deviceData: res.result[DEVICE_REQUEST_ID].result.reports[0],
				osData: res.result[OS_REQUEST_ID].result.reports[0],
				mediumData: res.result[MEDIUM_REQUEST_ID].result.reports[0],
				socialNetworkData: res.result[SOCIAL_REQUEST_ID].result.reports[0],
				pagePathData: res.result[PAGE_PATH_REQUEST_ID].result.reports[0],
				exitPageData: res.result[EXIT_PAGE_REQUEST_ID].result.reports[0],
			});/**/
		}, (err) => {
			console.log(err);// eslint-disable-line
		});
	}

	renderAnalytics() {
		const gapi = window.gapi;
		if (!gapi || !this.props.clientId || !this.props.gapi_token_access) return undefined;
		// this.renderAnalyticsTimeline();
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
				
				analytics.auth.on('success', () => {
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
			/**
			 * Current and past month specific numbers
			 */
			const currentMonthData = this.state.currentMonthData.data;
			const currentMonthHeaders = this.state.currentMonthData.columnHeader;

			const pastMonthData = this.state.pastMonthData.data;
			const pastMonthHeaders = this.state.pastMonthData.columnHeader;

			const totalPageViews = currentMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_PAGEVIEWS, currentMonthHeaders)];
			const totalSessions = currentMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_SESSIONS, currentMonthHeaders)];
			const percentNewSessions = Math.round(currentMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_PERCENT_NEW_SESSIONS, currentMonthHeaders)]);
			const averageSessionDuration = currentMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_AVG_SESSION_DURATION, currentMonthHeaders)];
			const formattedAvgSessionDuration = GAPI_Helper.formatSessionDuration(averageSessionDuration);

			const pastTotalPageViews = pastMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_PAGEVIEWS, pastMonthHeaders)];
			const pastTotalSessions = pastMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_SESSIONS, pastMonthHeaders)];
			const pastAverageSessionDuration = pastMonthData.totals[0].values[GAPI_Helper.getMetricIndex(GA_AVG_SESSION_DURATION, pastMonthHeaders)];

			const deltaPageViews = Math.round((totalPageViews - pastTotalPageViews) / pastTotalPageViews * 100);
			const deltaSessions = Math.round((totalSessions - pastTotalSessions) / pastTotalSessions * 100);
			const deltaAvgSessionDuration = Math.round((averageSessionDuration - pastAverageSessionDuration) / pastAverageSessionDuration * 100);


			/**
			 * Dimensions (Browsers, Devices, OSs, etc)
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
			const socialNetworkHeaders = this.state.socialNetworkData.columnHeader;

			const pagePathData = this.state.pagePathData.data;
			const pagePathHeaders = this.state.pagePathData.columnHeader;

			const exitPageData = this.state.exitPageData.data;
			const exitPageHeaders = this.state.exitPageData.columnHeader;

			const browserList = GAPI_Helper.formatSimpleData(browserData, browserHeaders, GA_BROWSER, totalSessions).map((row) => {
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

			const sourceList = GAPI_Helper.formatSimpleData(mediumData, mediumHeaders, GA_MEDIUM, totalSessions).map((row) => {
				row.name = row.name === '(none)' ? 'Direct' : row.name;
				return row;
			}).slice(0, 3);

			const deviceList = GAPI_Helper.formatSimpleData(deviceData, deviceHeaders, GA_DEVICE, totalSessions).slice(0, 3);
			const osList = GAPI_Helper.formatSimpleData(osData, osHeaders, GA_OS, totalSessions).slice(0, 3);
			const socialRefList = GAPI_Helper.formatSimpleData(socialNetworkData, socialNetworkHeaders, GA_SOCIAL, totalSessions).filter(ref => ref.name !== '(not set)').slice(0, 3);

			const mostViewedPagePath = GAPI_Helper.formatSimpleData(pagePathData, pagePathHeaders, GA_PAGE_PATH, totalSessions)[0];
			const mostExitedPagePath = GAPI_Helper.formatSimpleData(exitPageData, exitPageHeaders, GA_EXIT_PAGE, totalSessions)[0];

			mostViewedPagePath.name = mostViewedPagePath.name === '/' ? 'Home' : mostViewedPagePath.name;
			mostExitedPagePath.name = mostExitedPagePath.name === '/' ? 'Home' : mostExitedPagePath.name;

			gaInfos = (
				<div>
					<section className="padded-content analytics-section">
						<h1>Analytics Dashboard</h1>
						<p>Stats are based on the last 30 days</p>
					</section>
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
									<div className={`modifier ${GAPI_Helper.getClassFromDelta(deltaPageViews)}`}><i></i>{deltaPageViews}%</div>
									<div className={`modifier-period ${GAPI_Helper.getClassFromDelta(deltaPageViews)}`}>Derniers 30 jours</div>
								</div>
							</div>

							<div className="summary-item sessions">
								<div className="number">
									<i className="fa fa-desktop"></i>
									<strong>{totalSessions}</strong>
								</div>
								<div className="infos">
									<div className="name">Sessions</div>
									<div className={`modifier ${GAPI_Helper.getClassFromDelta(deltaSessions)}`}><i></i>{deltaSessions}%</div>
									<div className={`modifier-period ${GAPI_Helper.getClassFromDelta(deltaSessions)}`}>Derniers 30 jours</div>
								</div>
							</div>

							<div className="summary-item avg-time">
								<div className="number">
									<i className="fa fa-clock-o"></i>
									<strong>{formattedAvgSessionDuration}</strong>
								</div>
								<div className="infos">
									<div className="name">Temps moy.</div>
									<div className={`modifier ${GAPI_Helper.getClassFromDelta(deltaAvgSessionDuration)}`}><i></i>{deltaAvgSessionDuration}%</div>
									<div className={`modifier-period ${GAPI_Helper.getClassFromDelta(deltaAvgSessionDuration)}`}>Derniers 30 jours</div>
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
