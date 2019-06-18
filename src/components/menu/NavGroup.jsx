import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Module from './Module';
import Page from './Page';
import NativeModule from './NativeModule';
import Collapsable from '../animation/Collapsable';

import { NavGroup as StyledNavGroup, Subnav, GroupHeading, NavItem } from '../../styles/Nav';


export default class NavGroup extends Component {
	static propTypes = {
		toggleCollapse: PropTypes.func,
		clearList: PropTypes.func,

		childrenGroups: PropTypes.array,
		data: PropTypes.object,
		level: PropTypes.number,
		toggleState: PropTypes.object,
	};

	getChildrenGroups(level) {
		return this.props.data.childrenGroups.map((item) => {
			return <NavGroup key={item.id} data={item} level={level} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} clearList={this.props.clearList} />;
		});
	}

	getContents(isOpen) {
		const level = this.props.level + 1;
		return (<Collapsable isCollapsed={isOpen}>
			<Subnav>
				{
					this.props.data.tables.map((item) => {
						return 	<NavItem key={item.id}><Table name={item.name} id={item.id} displayLabel={item.displayLabel} nrecords={item.nrecords} clearList={this.props.clearList} /></NavItem>;
					})
				}
				{
					this.props.data.modules.map((item) => {
						// console.log(item.isFrontendComponent, item);
						if (item.isFrontendComponent) {
							return <NavItem key={`mod-${item.id}`}><NativeModule {...item} /></NavItem>;
						}
						return <NavItem key={`mod-${item.id}`}><Module {...item} clearList={this.props.clearList} /></NavItem>;
					})
				}
				{
					this.props.data.pages.map((item) => {
						// console.log(item);
						return <NavItem key={`pg-${item.id}`}><Page {...item} clearList={this.props.clearList} /></NavItem>;
					})
				}
				{this.getChildrenGroups(level)}
			</Subnav>
		</Collapsable>);
	}

	onToggle = () => {
		this.props.toggleCollapse(this.props.data.id);
	}

	render() {
		if (!this.props.data) return null;
		const isOpen = this.props.toggleState[this.props.data.id];
		const activeClass = isOpen ? 'active' : '';
		const icon = this.props.data.icon || 'folder';

		const contents = this.getContents(isOpen);

		return (
			<StyledNavGroup className={`${activeClass}`} >
				<GroupHeading onClick={this.onToggle} className={`${activeClass}`}>
					<i className={`fa fa-${icon} fa-fw`}></i>
					<span className="nav-label">{this.props.data.name}</span> <span className="fa fa-angle-down"></span>
				</GroupHeading>
				{contents}
			</StyledNavGroup>
		);
	}
}
