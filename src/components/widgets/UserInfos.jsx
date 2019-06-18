import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cssVariables from '../../styles/Variables';

import Gravatar from './Gravatar';

const Container = styled.div`
	padding: 40px 25px;
	background: url(../assets/img/user-bg.jpg) bottom right no-repeat;
	background-size: cover;
	font-weight: ${cssVariables.fontWeightSemibold};

	img {
		border-radius: 100%;
	}

	p {
		margin-bottom: 0;
	}
`;

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
			<Container>
				<Gravatar picture={this.props.picture} email={this.props.email} />
				<p><Link to={`/edit/zva_user/${this.props.userId}`}>{this.props.realName}</Link></p>
			</Container>
		);
	}
}
