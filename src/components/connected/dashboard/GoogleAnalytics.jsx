import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchVariable } from 'actions/env';


@connect(
	state => { 
		if (!state.envVariables.api_google) return {};
		return {
			...state.envVariables.api_google,
		};
	},
	dispatch => bindActionCreators({ fetchVariable }, dispatch)
)
export class GoogleAnalytics extends Component {
	static propTypes = {
		clientId: React.PropTypes.string,
		property: React.PropTypes.string,

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
		//console.log('render timeline');
		const gapi = window.gapi;

		// Get data and do something with it.
		gapi.client.analytics.data.ga.get({
			dimensions: 'ga:date,ga:source,ga:browser,ga:browserVersion',
			metrics: 'ga:sessions,ga:pageviews',
			'start-date': '30daysAgo',
			'end-date': 'yesterday',
			ids: `ga:${this.props.property}`,
		}).then((res) => {
			console.log('Sessions and pageviews', res);

			this.setState({
				gaInfos: res.result,
			});
		});

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
		if (!this.props.clientId) return undefined;
		const gapi = window.gapi;
		gapi.analytics.ready(() => {
		
			if (gapi.analytics.auth.isAuthorized()) {
				this.renderAnalyticsTimeline();
				return undefined;
			}

			gapi.analytics.auth.authorize({
				container: this._authbtn,
				clientid: this.props.clientId,
			});

			gapi.analytics.auth.on('success', () => {
				// console.log('authorized');
				this.renderAnalyticsTimeline();
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
			<section data-id={this.props.clientId}>
				<section ref={el => this._authbtn = el}></section>
				<section ref={el => this._timeline = el}></section>
				{gaInfos}
			</section>
		);
	}
}
