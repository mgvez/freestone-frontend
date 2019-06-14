import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProdEnvWarning from '../widgets/ProdEnvWarning';
import HomeButton from '../widgets/HomeButton';
import NavToggler from '../../containers/widgets/NavToggler';
import LoadedRecordsToggler from '../../containers/widgets/LoadedRecordsToggler';

import cssVariables from '../../styles/Variables';
import colors from '../../styles/Colors';
import { Button } from '../../styles/Button';

export const topHeaderHeight = 60;
const verticalPadding = 15;
const innerHeight = topHeaderHeight - (2 * verticalPadding);

const StyledHeader = styled.header`
	padding: ${verticalPadding}px 25px;
	background: ${colors.gray96};
	position: absolute;
		top: 0;
		right: 0;
	width: calc(100% - ${cssVariables.navWidth});

	&.fullwidth {
		width: 100%;
	}

	height: ${cssVariables.headerHeight};
	display: flex;
	align-content: flex-start;
	justify-content: space-between;
	transition: width 0.3s;

	> div {
		height: ${innerHeight}px;
		display: flex;
		align-self: center;
	}

	.logout {
		align-self: center;
		margin: 0 25px 0 30px;
		line-height: ${innerHeight}px;
		a {
			margin: 0 0 0 1.5em;
		}
	}

	.fcn {
		line-height: ${innerHeight}px;
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
		isNavVisible: PropTypes.bool,

		logout: PropTypes.func,
		clearData: PropTypes.func,
		clearSchema: PropTypes.func,
	};

	render() {
		// console.log(this.props);
		const debug = this.props.isGod || window.IS_DEV ? (<div className="debug-fcn">
			<Button info faded round small onClick={this.props.clearSchema}>
				Clear schema
			</Button>
			<Button info faded round small onClick={this.props.clearData}>
				Clear all data
			</Button>
			
		</div>) : null;

		const prodWarning = this.props.isProdEnv ? <ProdEnvWarning /> : null;

		return (
			<StyledHeader ref="header" className={!this.props.isNavVisible ? 'fullwidth' : null}>

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
