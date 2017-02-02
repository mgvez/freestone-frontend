import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchVariable } from 'actions/env';


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

		//v4
		// gapi.client.analyticsreporting.reports.batchGet({
		gapi.client.request({
			path: '/v4/reports:batchGet',
			root: 'https://analyticsreporting.googleapis.com/',
			method: 'POST',
			body: {
				reportRequests: [
					{
						viewId: property,
						dimensions: [
							{
								name: 'ga:date',
							},
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
		}).then((res) => {
			//console.log('Sessions and pageviews', res.result.reports);

			this.setState({
				gaInfos: res.result.reports[0],
			});
		}, (err) => {
			console.log(err);	
		});

		//v3
		// gapi.client.analytics.data.ga.get({
		// 	dimensions: 'ga:date,ga:source,ga:browser,ga:browserVersion',
		// 	metrics: 'ga:sessions,ga:pageviews',
		// 	'start-date': '30daysAgo',
		// 	'end-date': 'yesterday',
		// 	ids: `ga:${property}`,
		// }).then((r) => {
		// 	console.log(r);
		// });


		// Get a timeline component (graph)
		/*const timeline = new gapi.analytics.googleCharts.DataChart({
			reportType: 'ga',
			query: {
				dimensions: 'ga:date',
				metrics: 'ga:sessions',
				'start-date': '30daysAgo',
				'end-date': 'yesterday',
				ids: `ga:${this.props.property}`,
			},
			chart: {
				type: 'LINE',
				container: this._timeline,
			},
		});
		timeline.execute();/**/
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
		if (this.state.gaInfos) {

			const data = this.state.gaInfos.data;
			const headers = this.state.gaInfos.columnHeader;
			console.log(headers);
			console.log(data);
			
			const getMetricIndex = (headerName) => {
				return headers.metricHeader.metricHeaderEntries.indexOf(headers.metricHeader.metricHeaderEntries.filter(x => x.name === headerName)[0]);
			};

			const getDimensionIndex = (headerName) => {
				return headers.dimensions.indexOf(headers.dimensions.filter(x => x === headerName)[0]);
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
			
			const totalPageViews = data.totals[0].values[getMetricIndex('ga:pageviews')];
			const totalSessions = data.totals[0].values[getMetricIndex('ga:sessions')];
			const percentNewSessions = Math.round(data.totals[0].values[getMetricIndex('ga:percentNewSessions')]);

			const averageSessionDuration = data.totals[0].values[getMetricIndex('ga:avgSessionDuration')];
			const avgSessionMinutes = Math.floor(averageSessionDuration / 60);
			const avgSessionSeconds = Math.round(averageSessionDuration % 60);
			const formattedAvgSessionDuration = `${avgSessionMinutes}:${avgSessionSeconds}`;

			const browsers = new Map();
			const operatingSystems = new Map();
			const devices = new Map();
			const sources = new Map();
			const socialRefs = new Map();
			data.rows.forEach((row) => {
				const browserName = row.dimensions[getDimensionIndex('ga:browser')];
				const osName = row.dimensions[getDimensionIndex('ga:operatingSystem')];
				const deviceName = row.dimensions[getDimensionIndex('ga:deviceCategory')];
				const sourceName = row.dimensions[getDimensionIndex('ga:medium')];
				const socialNetwork = row.dimensions[getDimensionIndex('ga:socialNetwork')];
				const sessions = parseInt(row.metrics[0].values[getMetricIndex('ga:sessions')], 10);

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
									<div className="modifier up"><i></i>48%</div>
									<div className="modifier-period up">Derniers 30 jours</div>
								</div>
							</div>

							<div className="summary-item sessions">
								<div className="number">
									<i className="fa fa-desktop"></i>
									<strong>{totalSessions}</strong>
								</div>
								<div className="infos">
									<div className="name">Sessions</div>
									<div className="modifier down"><i></i>3%</div>
									<div className="modifier-period down">Derniers 30 jours</div>
								</div>
							</div>

							<div className="summary-item avg-time">
								<div className="number">
									<i className="fa fa-clock-o"></i>
									<strong>{formattedAvgSessionDuration}</strong>
								</div>
								<div className="infos">
									<div className="name">Temps moy.</div>
									<div className="modifier"><i></i>0%</div>
									<div className="modifier-period">Derniers 30 jours</div>
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
									<strong>670</strong>
								</div>
								<div className="infos">
									<div className="name">Page la plus visitée</div>
									<a href="#">http://google.ca</a>
								</div>
							</div>

							<div className="user-infos-item warn">
								<div className="number">
									<i className="fa fa-eye"></i>
									<strong>598</strong>
								</div>
								<div className="infos">
									<div className="name">Page la plus quittée</div>
									<a href="#">http://google.ca</a>
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
