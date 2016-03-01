import React, { Component } from 'react';

import { Table } from 'components/Menu/Table';


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
	}

	getChildrenGroups(level) {
		return this.props.data.childrenGroups.map((item) => {
			return <NavGroup key={item.id} data={item} level={level} toggleState={this.props.toggleState} toggleCollapse={this.props.toggleCollapse} />;
		});
	}

	toggle = () => {
		this.props.toggleCollapse(this.props.data.id);
	};

	render() {

		if (!this.props.data.childrenGroups.length && !this.props.data.tables.length) return null;

		// console.log(this.props.toggleState);
		// console.log(this.props.level + ' nav group rendered', this.props.data);
		const level = this.props.level + 1;
		const groupId = this.props.data.id;
		const isOpen = this.props.toggleState[groupId];
		const toggleClass = isOpen ? '' : 'collapsed';
		const activeClass = isOpen ? 'active' : '';
		const icon = this.props.data.icon || 'folder';
		return (
			<li className={activeClass} >
				<a onClick={this.toggle} className={`table-group ${activeClass}`}>
					<i className={`fa fa-${icon}`}></i>
					<span className="nav-label">{this.props.data.name}</span> <span className="fa arrow"></span>
				</a>
				
				<ul className={toggleClass}>
				{ this.getChildrenGroups(level) }
				{
					this.props.data.tables.map((item) => {
						return <Table key={item.id} name={item.name} id={item.id} actionLabel={item.actionLabel}/>;
					})
				}
				</ul>
			</li>
		);
	}
}
