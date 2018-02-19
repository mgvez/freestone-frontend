import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class TroubleshootingButton extends Component {
	static propTypes = {
		showIcon: PropTypes.bool,
		customClass: PropTypes.string,
	};

	render() {
		const icon = this.props.showIcon ? <i className="fa fa-gear fa-fw"></i> : null;
		return (
			<Link to={'/troubleshooting'} className={`troubleshooting-button ${this.props.customClass}`}>{icon}<span className="nav-label">Troubleshooting</span></Link>
		);
	}
}
