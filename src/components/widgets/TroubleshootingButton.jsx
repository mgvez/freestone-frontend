import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TroubleshootingButton extends Component {
	static propTypes = {
		showIcon: React.PropTypes.bool,
		customClass: React.PropTypes.string,
	};

	render() {
		const icon = this.props.showIcon ? <i className="fa fa-gear fa-fw"></i> : null;
		return (
			<Link to={'/troubleshooting'} className={`troubleshooting-button ${this.props.customClass}`}>{icon}<span className="nav-label">Troubleshooting</span></Link>
		);
	}
}
