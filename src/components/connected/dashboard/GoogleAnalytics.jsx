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
		const property = this.props.property || '113782268';
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
								name: 'ga:source',
							},
							{
								name: 'ga:browser',
							},
							{
								name: 'ga:browserVersion',
							},
						],
						metrics: [
							{
								expression: 'ga:sessions',
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
			console.log('Sessions and pageviews', res.result.reports);

			// this.setState({
			// 	gaInfos: res.result,
			// });
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

			const data = this.state.gaInfos;
			const totalPageViews = data.totalsForAllResults['ga:pageviews'];
			const totalSessions = data.totalsForAllResults['ga:sessions'];

			// Hash table des browsers avec leurs versions
			const browserList = new Map();
			const sources = [];
			data.rows.forEach((row) => {
				const browserName = row[data.columnHeaders.indexOf(data.columnHeaders.filter(r => r.name === 'ga:browser')[0])];
				const browserVersion = row[data.columnHeaders.indexOf(data.columnHeaders.filter(r => r.name === 'ga:browserVersion')[0])];
				const sessions = parseInt(row[data.columnHeaders.indexOf(data.columnHeaders.filter(r => r.name === 'ga:sessions')[0])], 10);
				const source = row[data.columnHeaders.indexOf(data.columnHeaders.filter(r => r.name === 'ga:source')[0])];

				const alreadyLoggedSource = sources.some(s => s.name === source);

				if (!alreadyLoggedSource) {
					sources.push({
						name: source,
						sessions,
					});
				} else {
					sources[sources.indexOf(sources.filter(s => s.name === source)[0])].sessions += sessions;
				}

				const browserObject = browserList.get(browserName) || { versions: [], totalSessions: 0 };
				const alreadyLoggedBrowser = browserObject.versions.some(v => v.name === browserVersion);

				if (!alreadyLoggedBrowser) {
					browserObject.versions.push({
						name: browserVersion,
						sessions,
					});
				} else {
					browserObject.versions[browserObject.versions.indexOf(browserObject.versions.filter(v => v.name === browserVersion)[0])].sessions += sessions;
				}

				browserObject.totalSessions += sessions;
				browserList.set(browserName, browserObject);
			});

			browserList.forEach((value, key) => {
				value.versions.sort((a, b) => {
					if (a.sessions > b.sessions) return -1;
					if (a.sessions < b.sessions) return 1;
					return 0;
				});
			});

			sources.sort((a, b) => {
				if (a.sessions > b.sessions) return -1;
				if (a.sessions < b.sessions) return 1;
				return 0;
			});

			const browserInfos = (
				<div className="browser-list">
					<h4 style={{ marginBottom: 0 }}>Browsers :</h4>
					<p>Groupés par nom, puis par version et nombre de sessions.</p>
					{
						Array.from(browserList)
							.sort((a, b) => {
								if (a[1].totalSessions > b[1].totalSessions) return -1;
								if (a[1].totalSessions < b[1].totalSessions) return 1;
								return 0;
							})
							.map((browser) => {
								return (
									<div className="browser-list-item" key={browser[0]}>
										<p><strong>{browser[0]}</strong> - {Math.round(browser[1].totalSessions / totalSessions * 100)}% de toutes les sessions</p>
										<ul>
											{
												browser[1].versions.map(v => <li key={v.name}>{v.name} - <strong>{v.sessions}</strong></li>)
											}
										</ul>
									</div>
								);
							})
					}
				</div>
			);

			gaInfos = (
				<section>
					<h4>Page views : <strong>{totalPageViews}</strong></h4>
					<h4>Sessions : <strong>{totalSessions}</strong></h4>

					<h4>Sources :</h4>
					<ul>
						{
							sources.map(s => <li key={s.name}>{s.name} - {s.sessions}</li>)
						}
					</ul>

					{browserInfos}
				</section>
			);
		}

		return (
			<section data-id={this.props.clientId} className="analytics">
				<section ref={el => this._authbtn = el}></section>

				<section className="padded-content analytics-section summary">
					<h2>Résumé du traffic du site</h2>

					<div className="summary-items">
						<div className="summary-item page-views">
							<div className="number">
								<i className="fa fa-eye"></i>
								<strong>1101</strong>
							</div>
							<div className="infos">
								<div className="name">Page views</div>
								<div className="modifier up"><i></i>48%</div>
								<div className="modifier-period up">Dernière semaine</div>
							</div>
						</div>

						<div className="summary-item sessions">
							<div className="number">
								<i className="fa fa-desktop"></i>
								<strong>343</strong>
							</div>
							<div className="infos">
								<div className="name">Sessions</div>
								<div className="modifier down"><i></i>3%</div>
								<div className="modifier-period down">Dernière semaine</div>
							</div>
						</div>

						<div className="summary-item avg-time">
							<div className="number">
								<i className="fa fa-clock-o"></i>
								<strong>17:38</strong>
							</div>
							<div className="infos">
								<div className="name">Temps moy.</div>
								<div className="modifier"><i></i>0%</div>
								<div className="modifier-period">Dernière semaine</div>
							</div>
						</div>
					</div>
				</section>

				<section className="padded-content analytics-section browsers">
					<h2>Navigateurs utilisés</h2>

					<div className="browsers-list">
						<div className="browser chrome">
							<div className="percentage">
								<i className="fa fa-chrome"></i>40%
							</div>
							<div className="name">Google Chrome</div>
						</div>
						<div className="browser safari">
							<div className="percentage">
								<i className="fa fa-safari"></i>30%
							</div>
							<div className="name">Safari</div>
						</div>
						<div className="browser firefox">
							<div className="percentage">
								<i className="fa fa-firefox"></i>11%
							</div>
							<div className="name">Mozilla Firefox</div>
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
				{gaInfos}
			</section>
		);
	}
}
