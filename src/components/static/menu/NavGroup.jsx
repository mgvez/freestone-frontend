import React, { Component } from 'react';

import { Table } from 'components/static/menu/Table';
import { Module } from 'components/static/menu/Module';
import { NativeModule } from 'components/static/menu/NativeModule';
import { Collapser } from 'animation/Collapser';

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
			{this.getChildrenGroups(level)}
			{
				this.props.data.tables.map((item) => {
					return <Table key={item.id} name={item.name} id={item.id} displayLabel={item.displayLabel} nrecords={item.nrecords} />;
				})
			}
			{
				this.props.data.modules.map((item) => {
					return <Module key={`mod-${item.id}`} {...item} />;
				})
			}
			{
				this.props.data.nativeModules.map((item) => {
					return <NativeModule key={`mod-${item.id}`} {...item} />;
				})
			}
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
					<i className={`fa fa-${icon}`}></i>
					<span className="nav-label">{this.props.data.name}</span> <span className="fa arrow"></span>
				</a>
				{contents}
			</li>
		);
	}
}
