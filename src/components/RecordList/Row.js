import React, { Component } from 'react';

import { FileThumbnail } from 'components/FileThumbnail/FileThumbnail';
import { OrderFcn } from 'components/RecordList/OrderFcn';
import { ModifFcn } from 'components/RecordList/ModifFcn';
import { InfosFcn } from 'components/RecordList/InfosFcn';

export class Row extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		env: React.PropTypes.object,
		fields: React.PropTypes.array,
		values: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props.values);
		
		let orderCell;
		if (this.props.table.hasOrder) {
			orderCell = <OrderFcn />;
		}

		const modifCell = <ModifFcn tableName={this.props.table.name} prikey={this.props.values.prikey} />;
		const infoCell = (
			<InfosFcn
				tableName={this.props.table.name}
				prikey={this.props.values.prikey}
				lastmodifdate={this.props.values.lastmodifdate}
				createddate={this.props.values.createddate}
			/>
		);

		if (this.props.table.isSelfTree) {
			const level = this.props.values.breadcrumb ? this.props.values.breadcrumb : '0';
			return (
				<tr>
					<td>{level}</td>
					<td>
						{
							this.props.fields.map((field, index) => {
								return <span key={index}>{ this.props.values[field.listAlias] }</span>;
							})
						}
					</td>
					{ orderCell }
					{ modifCell }
					{ infoCell }
				</tr>
			);
		}

		return (
			<tr>
				{
					this.props.fields.map((field, index) => {
						console.log(field);
						let val = this.props.values[field.listAlias];
						if (field.type === 'img' || field.type === 'file') {
							val = <FileThumbnail val={this.props.values[field.listAlias]} dir={field.folder} env={this.props.env} type={field.type} />;
						}
						return <td key={index}>{ val }</td>;
					})
				}
				{ orderCell }
				{ modifCell }
				{ infoCell }
			</tr>
		);
	}
}
