import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Page extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		id: React.PropTypes.number,
		flag: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number,
		]),
		flag_type: React.PropTypes.string,
		className: React.PropTypes.string,
	};

	render() {

		let flag;
		if (this.props.flag) {
			flag = (<span className="flag">
				<span className={`${this.props.flag_type}`}>{this.props.flag}</span>
			</span>);
		}

		return (
			<NavLink to={`/page/${this.props.id}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label} {flag}</NavLink>
		);
	}
}
