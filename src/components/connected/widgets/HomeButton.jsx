import React, { Component } from 'react';
import { Link } from 'react-router';

export class HomeButton extends Component {
	static propTypes = {
		showIcon: React.PropTypes.bool,
		customClass: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const icon = this.props.showIcon ? <i className="fa fa-home"></i> : null;
		return (
			<Link to={'/'} className={`home-button ${this.props.customClass}`}>{icon}<span className="nav-label">Dashboard</span></Link>
		);
	}
}
