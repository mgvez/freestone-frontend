import React, { Component } from 'react';
import { Link } from 'react-router';

import { goTo } from 'actions/nav';


export class Module extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		url: React.PropTypes.string,
		id: React.PropTypes.number,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li>
				<Link to={`/module/${this.props.url}`} activeClassName="active" className="module"><span className="fa fa-wrench"></span> {this.props.label}</Link>
			</li>
		);
	}
}
