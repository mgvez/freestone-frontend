import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchVariable } from 'actions/env';


@connect(
	state => { 
		if (!state.clientVariables.api_google) return {};
		return {
			...state.clientVariables.api_google,
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
		this.renderAnalytics();
	}

	requireData(props) {
		if (typeof props.clientId === 'undefined') this.props.fetchVariable('api.google');
	}

	renderAnalyticsTimeline() {
		// console.log('render timeline');
		const gapi = window.gapi;
		const timeline = new gapi.analytics.googleCharts.DataChart({
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
		timeline.execute();
	}

	renderAnalytics() {
		if (!this.props.clientId) return null;
		const gapi = window.gapi;
		gapi.analytics.ready(() => {
			// console.log('analytics ready', this.props.property);
			
			if (gapi.analytics.auth.isAuthorized()) {
				this.renderAnalyticsTimeline();
				return null;
			}

			gapi.analytics.auth.authorize({
				container: this._authbtn,
				clientid: this.props.clientId,
			});

			gapi.analytics.auth.on('success', (response) => {
				console.log('authorized');
				this.renderAnalyticsTimeline();
			});
		});
	}

	render() {
		// console.log('render ga', this.props.clientId);
		return (
			<section data-id={this.props.clientId}>
				<section ref={el => this._authbtn = el}></section>
				<section ref={el => this._timeline = el}></section>
			</section>
		);
	}
}
