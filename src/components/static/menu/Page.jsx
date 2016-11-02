import React, { Component } from 'react';
import { Link } from 'react-router';

export class Page extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		id: React.PropTypes.number,
	};

	render() {
		return (
			<li className="nav-item">
				<Link to={`/page/${this.props.id}`} activeClassName="active" className="module">{this.props.label}</Link>
			</li>
		);
	}
}
