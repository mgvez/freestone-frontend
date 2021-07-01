import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavGroup from './NavGroup';
import UserInfos from '../../containers/widgets/UserInfos';
import { NavbarContainer, NavItem } from '../../styles/Nav';
import { NavLinkButton } from '../../styles/Button';
import { Icon } from '../../styles/Icon';
import cssVars from '../../styles/Variables';
import styled from 'styled-components';

const NavWrapper = styled.ul`
	.menu-dashboard {
		display: flex;
		align-items: center;
		padding: 10px 15px;
		position: relative;
		height: 34px;
		font-weight: ${cssVars.fontWeightNormal};
		line-height: normal;
		padding: 10px 15px;

		i {
			font-size: 14px;
			margin-right: 0px;
		}

		span {
			margin-left: 8px;
		}
	}
`;
export default class Nav extends Component {
	static propTypes = {
		fetchNav: PropTypes.func,
		toggleCollapse: PropTypes.func,
		clearList: PropTypes.func,

		tree: PropTypes.array,
		toggleState: PropTypes.object,
		username: PropTypes.string,
		visible: PropTypes.bool,
	};
	
	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		if (!props.tree.length) this.props.fetchNav();
	}

	render() {
		return (
			<NavbarContainer className={this.props.visible ? '' : 'collapsed'} role="navigation">
				<UserInfos />
				<NavWrapper>
					<NavItem key="home">
						<NavLinkButton to={'/'} inline="true" className="menu-dashboard dashboard"><Icon icon="home" /> <span>Dashboard</span></NavLinkButton>
					</NavItem>
					{
						this.props.tree.map((item) => {
							// console.log('item...');
							return <NavGroup key={item.id} data={item} level={0} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} clearList={this.props.clearList} />;
						})
					}
					<NavItem key="settings">
						<NavLinkButton to="/n-module/settings" inline="true" className="menu-dashboard dashboard"><Icon icon="cog" /> <span>Settings</span></NavLinkButton>
					</NavItem>
				</NavWrapper>
			</NavbarContainer>
		);
	}
}
