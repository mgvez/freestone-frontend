import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProdEnvWarning from '../widgets/ProdEnvWarning';
import HomeButton from '../widgets/HomeButton';
import NavToggler from '../../containers/widgets/NavToggler';
import LoadedRecordsToggler from '../../containers/widgets/LoadedRecordsToggler';

import cssVariables from '../../styles/Variables';
import colors from '../../styles/Colors';

const StyledHeader = styled.header`
	padding: 15px 25px;
	background: ${colors.gray96};
	position: absolute;
		top: 0;
		right: 0;
	width: calc(100% - ${cssVariables.navWidth});
	height: ${cssVariables.headerHeight};
	display: flex;
	align-content: flex-start;
	justify-content: space-between;
	transition: width 0.3s;

	> div {
		height: 30px;
		display: flex;
		align-self: center;
	}

	.logout {
		align-self: center;
		margin: 0 25px 0 30px;
		line-height: 30px;
	}

	.fcn {
		line-height: 30px;
	}

	.debug-fcn {
		button {
			margin: 0 5px;
		}
	}
`;

export default class SiteHeader extends Component {
	static propTypes = {
		isGod: PropTypes.bool,
		isProdEnv: PropTypes.bool,

		logout: PropTypes.func,
		clearData: PropTypes.func,
		clearSchema: PropTypes.func,
	};

	render() {
		// console.log(this.props);
		const debug = this.props.isGod || window.IS_DEV ? (<div className="debug-fcn">
			<button className="button-debug-round-small" onClick={this.props.clearSchema}>
				Clear schema
			</button>
			<button className="button-debug-round-small" onClick={this.props.clearData}>
				Clear all data
			</button>
			
		</div>) : null;

		const prodWarning = this.props.isProdEnv ? <ProdEnvWarning /> : null;

		return (
			<StyledHeader ref="header">

				<div>
					<NavToggler />
					{debug}
				</div>

				{prodWarning}

				<div>
					<div className="logout">
						<HomeButton />
						<a onClick={this.props.logout}>
							<i className="fa fa-sign-out"></i> Logout
						</a>
					</div>

					<LoadedRecordsToggler />
				</div>

			</StyledHeader>
		);
	}
}
