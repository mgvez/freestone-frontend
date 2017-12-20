import React, { Component } from 'react';
import { Link } from 'react-router';

import Gravatar from './Gravatar';

export default class UserInfos extends Component {
	static propTypes = {
		email: React.PropTypes.string,
		username: React.PropTypes.string,
		realName: React.PropTypes.string,
		picture: React.PropTypes.string,
		userId: React.PropTypes.number,
	};

	render() {
		return (
			<div className="user">
				<Gravatar picture={this.props.picture} email={this.props.email} />
				<p><Link to={`/edit/zva_user/${this.props.userId}`}>{this.props.realName}</Link></p>
			</div>
		);
	}
}
