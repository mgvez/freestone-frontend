import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MAX_TIME_BETWEEN_API_CALLS } from '../freestone/settings';
import qstrParams from '../utils/qstrParams';
import Script from 'react-load-script';

import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import cssVariables from '../styles/Variables';

import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';
const iconList = Object.keys(icons).filter(key => key !== 'fas' && key !== 'prefix').map(icon => icons[icon]);
library.add(...iconList);
// import 'font-awesome/scss/font-awesome.scss';


/* application components */
import Footer from './footer/Footer';
import Shortcuts from '../containers/utils/Shortcuts';
import SiteHeader from '../containers/SiteHeader';
import Errors from '../containers/Errors';
import RecordPreview from '../containers/preview/RecordPreview';
import Nav from '../containers/menu/Nav';
import LoadedRecords from '../containers/dashboard/LoadedRecords';
import Login from '../containers/auth/Login';
import GoogleAuthenticate from '../containers/auth/GoogleAuthenticate';

function noop() {

}


const MainContent = styled.div`
	padding-top: ${cssVariables.topHeaderHeight}px;
	padding-left: ${cssVariables.navWidth}px;
	&.fullwidth {
		padding-left: 0;
	}
	transition: padding 0.3s;
`;

export default class Freestone extends Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool,
		isNavVisible: PropTypes.bool,
		lastRequestTime: PropTypes.number,
		freestone: PropTypes.object,
		jwt: PropTypes.string,

		loginUser: PropTypes.func,
		fetchVariable: PropTypes.func,
		fetchEnv: PropTypes.func,
		children: PropTypes.any,
	};

	constructor(props) {
		super(props);

		this.state = {
			gapiready: false,
		};
	}

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {

		//at load of app, force an API call to revalidate the JWT if last validation is too old
		const now = Date.now();
		const diff = (now - this.props.lastRequestTime) / 1000;
		if (diff > MAX_TIME_BETWEEN_API_CALLS) this.props.loginUser();

		this.requireData(this.props);
	}

	onGapiReady = () => {
		this.setState({ gapiready: true });
	}


	requireData(props) {
		// console.log(props.env);
		//s'assure que l'env est loadé
		if (!props.freestone.clientPath) this.props.fetchEnv();

	}
	

	render() {
		// console.log('%cRender Freestone (auth)', 'font-weight: bold');
		if (!this.props.isAuthenticated) {
			return (
				<div>
					<Errors {...this.props} />
					<Login gapiready={this.state.gapiready} />
					<GoogleAuthenticate onGapiReady={this.onGapiReady} />
				</div>
			);
		}

		//on login, if we want to redirect to public site (i.e. we may use the admin's login for public website access)
		const onLogin = qstrParams('onlogin');
		if (onLogin) {
			// console.log(this.props.env);
			const loc = onLogin === 'home' ? '' : onLogin;
			const root = `//${this.props.freestone.domain}${loc}?jwt=${this.props.jwt}`;
			window.location = root;
			return null;
		}

		return (
			<Shortcuts>
				<GlobalStyles />

				<RecordPreview>
					<Nav />
					<MainContent className={!this.props.isNavVisible ? 'fullwidth' : null}>
						<SiteHeader />
						<LoadedRecords />
						{this.props.children}
						<Footer />
						<Errors {...this.props} />
					</MainContent>
					<GoogleAuthenticate onGapiReady={this.onGapiReady} />
					{
						this.props.freestone.clientScripts.map((scriptInfos) => {
							return <Script key={scriptInfos.url} url={scriptInfos.url} onError={noop} onLoad={noop} />;
						})
					}
				</RecordPreview>
			</Shortcuts>
		);
	}
}
