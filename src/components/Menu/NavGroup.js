import React, { Component } from 'react';

import { Table } from 'components/Menu/Table';


export class NavGroup extends Component {
	static propTypes = {
		childrenGroups: React.PropTypes.array,
		data: React.PropTypes.object,
	}

	constructor(props) {
		super(props);
	}

	render() {
		// console.log('nav group rendered', this.props.data);
		return (
			<div>
				<h2>{this.props.data.name}</h2>
				{
					this.props.data.childrenGroups.map((item) => {
						return <NavGroup key={item.id} data={item}/>;
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
