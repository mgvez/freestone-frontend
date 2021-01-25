import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProdEnvWarning from '../widgets/ProdEnvWarning';
import NavToggler from '../../containers/widgets/NavToggler';
import LoadedRecordsToggler from '../../containers/widgets/LoadedRecordsToggler';

import cssVariables from '../../styles/Variables';
import colors from '../../styles/Colors';
import { Button, NavLinkButton } from '../../styles/Button';
import { Icon } from '../../styles/Icon';

const verticalPadding = 15;
const innerHeight = cssVariables.topHeaderHeight - (2 * verticalPadding);

const StyledHeader = styled.header`
	padding: ${verticalPadding}px ${cssVariables.contentSidePadding}px;
	background: ${colors.backgroundMain};
	position: absolute;
		top: 0;
		right: 0;
	width: calc(100% - ${cssVariables.navWidth}px);

	&.fullwidth {
		width: 100%;
	}

	height: ${cssVariables.topHeaderHeight}px;
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
		display: flex;
		align-items: center;
		
		button {
			margin: 0 5px;
		}
	}
	.version {
		font-size: 0.5em;
		position: absolute;
		right: ${cssVariables.contentSidePadding}px;
		top: 1px;
	}
`;

export default class SiteHeader extends Component {
	static propTypes = {
		isGod: PropTypes.bool,
		isProdEnv: PropTypes.bool,
		isNavVisible: PropTypes.bool,
		versionInfo: PropTypes.shape({
			val: PropTypes.string,	
			date: PropTypes.string,	
		}),

		logout: PropTypes.func,
		clearData: PropTypes.func,
		clearSchema: PropTypes.func,
	};

	render() {
		const debug = this.props.isGod || window.IS_DEV ? (<div className="debug-fcn">
			<Button info="true" faded="true" round="true" small="true" onClick={this.props.clearSchema}>
				Clear schema
			</Button>
			<Button info="true" faded="true" round="true" small="true" onClick={this.props.clearData}>
				Clear all data
			</Button>
			
		</div>) : null;

		let versionDisplay;

		if (this.props.versionInfo) {
			versionDisplay = <div className="version">v{this.props.versionInfo.val} updated on {this.props.versionInfo.date}</div>;
		}

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
						<NavLinkButton to={'/'} inline="true"><Icon icon="home" /><span> Dashboard</span></NavLinkButton>
						<Button inline="true" onClick={this.props.logout}>
							<Icon icon="sign-out-alt" /> Logout
						</Button>
					</div>

					<LoadedRecordsToggler />
					{versionDisplay}
				</div>

			</StyledHeader>
		);
	}
}
