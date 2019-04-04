import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Gravatar from './Gravatar';

export default class UserInfos extends Component {
	static propTypes = {
		email: PropTypes.string,
		username: PropTypes.string,
		realName: PropTypes.string,
		picture: PropTypes.string,
		userId: PropTypes.number,
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
