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
			
			const totalPageViews = data.totals[0].values[getMetricIndex('ga:pageviews')];
			const totalSessions = data.totals[0].values[getMetricIndex('ga:sessions')];

			const averageSessionDuration = data.totals[0].values[getMetricIndex('ga:avgSessionDuration')];
			const avgSessionMinutes = Math.floor(averageSessionDuration / 60);
			const avgSessionSeconds = Math.round(averageSessionDuration % 60);
			const formattedAvgSessionDuration = `${avgSessionMinutes}:${avgSessionSeconds}`;

			const browsers = new Map();
			data.rows.forEach((row) => {
				const browserName = row.dimensions[getDimensionIndex('ga:browser')];
				const sessions = parseInt(row.metrics[0].values[getMetricIndex('ga:sessions')], 10);

				const browserObject = browsers.get(browserName) || { totalSessions: 0 };
				browserObject.totalSessions += sessions;
				browsers.set(browserName, browserObject);
			});

			let browserList = Array.from(browsers).map((mapEntry) => {
				return {
					name: mapEntry[0],
					...mapEntry[1],
				};
			});
			
			browserList.sort((a, b) => {
				if (a.totalSessions > b.totalSessions) { return -1; }
				if (a.totalSessions < b.totalSessions) { return 1; }
				return 0;
			});

			browserList = browserList.map((browser) => {
				return {
					...browser,
					sessionPercentage: Math.round(browser.totalSessions / totalSessions * 100),
				};
			});

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
							<div className="browser chrome">
								<div className="percentage">
									<i className="fa fa-chrome"></i>{browserList[0].sessionPercentage}%
								</div>
								<div className="name">{browserList[0].name}</div>
							</div>
							<div className="browser safari">
								<div className="percentage">
									<i className="fa fa-safari"></i>{browserList[1].sessionPercentage}%
								</div>
								<div className="name">{browserList[1].name}</div>
							</div>
							<div className="browser firefox">
								<div className="percentage">
									<i className="fa fa-firefox"></i>{browserList[2].sessionPercentage}%
								</div>
								<div className="name">{browserList[2].name}</div>
							</div>
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

								<div className="data">
									<div className="name">Desktop</div>
									<div className="line" data-value="501">
										<div className="span" style={{ width: '50%' }}></div>
									</div>
								</div>
								
								<div className="data">
									<div className="name">Mobile</div>
									<div className="line" data-value="300">
										<div className="span" style={{ width: '30%' }}></div>
									</div>
								</div>

								<div className="data">
									<div className="name">Tablette</div>
									<div className="line" data-value="198">
										<div className="span" style={{ width: '20%' }}></div>
									</div>
								</div>
							</div>

							<div className="graph">
								<h2>Système d'exploitation</h2>

								<div className="data">
									<div className="name">Windows</div>
									<div className="line" data-value="801">
										<div className="span" style={{ width: '70%' }}></div>
									</div>
								</div>
								
								<div className="data">
									<div className="name">Mac OS</div>
									<div className="line" data-value="200">
										<div className="span" style={{ width: '15%' }}></div>
									</div>
								</div>

								<div className="data">
									<div className="name">Linux</div>
									<div className="line" data-value="50">
										<div className="span" style={{ width: '5%' }}></div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="padded-content analytics-section infographies">
						<h2>Infographie des visites</h2>
						
						<div className="graphs">
							<div className="column">
								<div className="graph round">
									<div className="c100 p75">
										<div className="slice">
											<div className="bar"></div>
											<div className="fill"></div>
										</div>
									</div>

									<div className="legend">
										<div className="legend-item highlight">
											<div className="color"></div>
											<div className="name">Nouveaux visiteurs</div>
											<div className="value">75%</div>
										</div>
										
										<div className="legend-item">
											<div className="color"></div>
											<div className="name">Anciens visiteurs</div>
											<div className="value">25%</div>
										</div>
									</div>
								</div>
							</div>
							<div className="column">
								<div className="graph">
									<h2>Type d'appareil utilisé</h2>

									<div className="data">
										<div className="name">Desktop</div>
										<div className="line" data-value="501">
											<div className="span" style={{ width: '50%' }}></div>
										</div>
									</div>
									
									<div className="data">
										<div className="name">Mobile</div>
										<div className="line" data-value="300">
											<div className="span" style={{ width: '30%' }}></div>
										</div>
									</div>

									<div className="data">
										<div className="name">Tablette</div>
										<div className="line" data-value="198">
											<div className="span" style={{ width: '20%' }}></div>
										</div>
									</div>
								</div>

								<div className="graph">
									<h2>Système d'exploitation</h2>

									<div className="data">
										<div className="name">Windows</div>
										<div className="line" data-value="801">
											<div className="span" style={{ width: '70%' }}></div>
										</div>
									</div>
									
									<div className="data">
										<div className="name">Mac OS</div>
										<div className="line" data-value="200">
											<div className="span" style={{ width: '15%' }}></div>
										</div>
									</div>

									<div className="data">
										<div className="name">Linux</div>
										<div className="line" data-value="50">
											<div className="span" style={{ width: '5%' }}></div>
										</div>
									</div>
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
