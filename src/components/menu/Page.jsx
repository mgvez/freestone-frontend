import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class Page extends Component {
	static propTypes = {
		label: PropTypes.string,
		id: PropTypes.number,
		flag: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		flag_type: PropTypes.string,
		className: PropTypes.string,
	};

	render() {

		let flag;
		if (this.props.flag) {
			flag = (<span className="flag">
				<span className={`${this.props.flag_type}`}>{this.props.flag}</span>
			</span>);
		}

		return (
			<Link to={`/page/${this.props.id}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label} {flag}</Link>
		);
	}
}
