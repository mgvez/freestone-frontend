import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Module from './Module';
import Page from './Page';
import NativeModule from './NativeModule';
import Collapsable from '../animation/Collapsable';

export default class NavGroup extends Component {
	static propTypes = {
		toggleCollapse: PropTypes.func,

		childrenGroups: PropTypes.array,
		data: PropTypes.object,
		level: PropTypes.number,
		toggleState: PropTypes.object,
	};

	getChildrenGroups(level) {
		return this.props.data.childrenGroups.map((item) => {
			return <NavGroup key={item.id} data={item} level={level} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} />;
		});
	}

	getContents(isOpen) {
		const level = this.props.level + 1;
		return (<Collapsable isCollapsed={isOpen}>
			<ul className="sub-nav">
				{
					this.props.data.tables.map((item) => {
						return 	<li className="nav-item" key={item.id}><Table name={item.name} id={item.id} displayLabel={item.displayLabel} nrecords={item.nrecords} /></li>;
					})
				}
				{
					this.props.data.modules.map((item) => {
						// console.log(item.isFrontendComponent, item);
						if (item.isFrontendComponent) {
							return <li className="nav-item" key={`mod-${item.id}`}><NativeModule {...item} /></li>;
						}
						return <li className="nav-item" key={`mod-${item.id}`}><Module {...item} /></li>;
					})
				}
				{
					this.props.data.pages.map((item) => {
						// console.log(item);
						return <li className="nav-item" key={`pg-${item.id}`}><Page {...item} /></li>;
					})
				}
				{this.getChildrenGroups(level)}
			</ul>
		</Collapsable>);
	}

	onToggle = () => {
		this.props.toggleCollapse(this.props.data.id);
	}

	render() {
		if (!this.props.data) return null;
		const isOpen = !this.props.toggleState[this.props.data.id];
		const activeClass = isOpen ? 'active' : '';
		const icon = this.props.data.icon || 'folder';

		const contents = this.getContents(isOpen);

		return (
			<li className={`${activeClass} nav-group`} >
				<a onClick={this.onToggle} className={`table-group ${activeClass}`}>
					<i className={`fa fa-${icon} fa-fw`}></i>
					<span className="nav-label">{this.props.data.name}</span> <span className="fa fa-angle-down"></span>
				</a>
				{contents}
			</li>
		);
	}
}
