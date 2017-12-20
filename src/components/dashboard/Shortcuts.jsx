import React, { Component } from 'react';

import { Table } from '../menu/Table';
import { Module } from '../menu/Module';
import { Page } from '../menu/Page';
import { NativeModule } from '../menu/NativeModule';

export default class Shortcuts extends Component {
	static propTypes = {
		tables: React.PropTypes.array,
		modules: React.PropTypes.array,
		pages: React.PropTypes.array,
	};

	render() {
		return (
			<section className="shortcuts padded-content">
				<h2>Shortcuts</h2>
				{
					this.props.tables.map((item) => {
						return <Table key={item.id} name={item.name} id={item.id} displayLabel={item.displayLabel} nrecords={item.nrecords} className="button-round" />;
					})
				}
				{
					this.props.modules.map((item) => {
						// console.log(item.isFrontendComponent, item);
						if (item.isFrontendComponent) {
							return <NativeModule key={`mod-${item.id}`} className="button-round" {...item} />;
						}
						return <Module key={`mod-${item.id}`} {...item} className="button-round" />;
					})
				}
				{
					this.props.pages.map((item) => {
						// console.log(item);
						return <Page key={`pg-${item.id}`} {...item} className="button-round" />;
					})
				}
			</section>
		);
	}
}
