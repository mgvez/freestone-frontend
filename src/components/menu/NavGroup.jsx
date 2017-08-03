import React, { Component } from 'react';

import { Table } from './Table';
import { Module } from './Module';
import { Page } from './Page';
import { NativeModule } from './NativeModule';
import { Collapser } from '../../animation/Collapser';

export class NavGroup extends Component {
	static propTypes = {
		toggleCollapse: React.PropTypes.func,

		childrenGroups: React.PropTypes.array,
		data: React.PropTypes.object,
		level: React.PropTypes.number,
		toggleState: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.collapser = new Collapser({
			getOpenState: (fromProps) => {
				const propsToCheck = fromProps || this.props;
				return propsToCheck.toggleState[propsToCheck.data.id];
			},
			changeState: () => {
				this.props.toggleCollapse(this.props.data.id);
			},
			getContainer: () => {
				return this._children;
			},
		});
	}

	componentDidUpdate(prevProps) {
		this.collapser.didUpdate(prevProps);
	}

	getChildrenGroups(level) {
		return this.props.data.childrenGroups.map((item) => {
			return <NavGroup key={item.id} data={item} level={level} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} />;
		});
	}

	getContents() {
		if (!this.collapser.getOpenState()) return null;
		const level = this.props.level + 1;
		return (<ul className="sub-nav" ref={(el) => this._children = el}>
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
		</ul>);
	}

	render() {

		// console.log(this.props.level + ' nav group rendered', this.props.data);
		const isOpen = this.collapser.getOpenState();

		const activeClass = isOpen ? 'active' : '';
		const icon = this.props.data.icon || 'folder';

		const contents = this.getContents();
		// console.log(this.props.data);
		return (
			<li className={`${activeClass} nav-group`} >
				<a onClick={this.collapser.toggle} className={`table-group ${activeClass}`}>
					<i className={`fa fa-${icon} fa-fw`}></i>
					<span className="nav-label">{this.props.data.name}</span> <span className="fa fa-angle-down"></span>
				</a>
				{contents}
			</li>
		);
	}
}