import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavGroup from './NavGroup';
import UserInfos from '../../containers/widgets/UserInfos';
import { NavbarContainer, NavGroup as StyledNavGroup, NavItem } from '../../styles/Nav';
import { NavLinkButton } from '../../styles/Button';
import { Icon } from '../../styles/Icon';
import styled from 'styled-components';

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
				<ul>
					<NavItem>
						<NavLinkButton to={'/'} inline="true" className="dashboard"><Icon icon="home" /><span>Dashboard</span></NavLinkButton>
					</NavItem>
					{
						this.props.tree.map((item) => {
							// console.log('item...');
							return <NavGroup key={item.id} data={item} level={0} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} clearList={this.props.clearList} />;
						})
					}
				</ul>
			</NavbarContainer>
		);
	}
}
