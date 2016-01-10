import React, { Component } from 'react';

import { Table } from 'components/Menu/Table';


export class NavGroup extends Component {
	static propTypes = {
		childrenGroups: React.PropTypes.array,
		data: React.PropTypes.object,
		level: React.PropTypes.number,
	}

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		// console.log(this.props.level + ' nav group rendered', this.props.data);
		const level = this.props.level + 1;
		return (
			<div>
				<h2>{this.props.level}. {this.props.data.name}</h2>
				{
					this.props.data.childrenGroups.map((item) => {
						return <NavGroup key={item.id} data={item} level={level}/>;
					})
				}
				<ul>
				{
					this.props.data.tables.map((item) => {
						return <Table key={item.id} name={item.name} id={item.id} actionLabel={item.actionLabel}/>;
					})
				}
				</ul>
			</div>
		);
	}
}
