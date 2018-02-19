import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Script from 'react-load-script';

export default class ClientComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		url: PropTypes.string,
		id: PropTypes.string,
	};

	constructor(props) {
		super(props);
		// console.log(props);
		this.state = {
			loaded: false,
		};
	}
	
	//on script loaded, change state to force update component
	onScriptLoaded = () => {
		// console.log(this.props.id);
		this.setState({ loaded: true });
	}
	
	onScriptError = () => {
		console.error(`cannot load client component ${this.props.id}`);
	}

	render() {
		//if component file exists, backend will have sent it in env var. See selector
		if (!this.props.id) {
			return null;
		}

		const component = window.CUSTOM_COMPONENTS && window.CUSTOM_COMPONENTS[this.props.name];

		if (!component) {
			return <Script url={this.props.url} onError={this.onScriptError} onLoad={this.onScriptLoaded} />;
		}
		
		return React.createElement(
			component,
			...this.props,
			// [...children]
		);
	}
}
