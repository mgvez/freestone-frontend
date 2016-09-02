import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Gravatar } from 'components/static/widgets/Gravatar';

@connect(
	state => { return state.auth; },
)
export class UserInfos extends Component {
	static propTypes = {
		email: React.PropTypes.string,
		username: React.PropTypes.string,
		picture: React.PropTypes.string,
		userid: React.PropTypes.number,
	};

	render() {
		return (
			<div className="user">
				<Gravatar picture={this.props.picture} email={this.props.email} />
				<p><Link to={`/edit/zva_user/${this.props.userid}`}>{this.props.username}</Link></p>
			</div>
		);
	}
}
