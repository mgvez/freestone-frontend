import React, { Component } from 'react';

import { FileThumbnail } from 'components/unconnected/FileThumbnail/FileThumbnail';
import { InfosFcn } from 'components/unconnected/RecordList/InfosFcn';

import { OrderFcn } from 'components/connected/RecordList/OrderFcn';
import { ModifFcn } from 'components/connected/RecordList/ModifFcn';

import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS } from 'freestone/schemaProps';

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
			orderCell = <OrderFcn tableName={this.props.table.name} prikey={this.props.values.prikey}/>;
		}

		const modifCell = <ModifFcn tableName={this.props.table.name} prikey={this.props.values.prikey} />;
		const infoCell = (
			<InfosFcn
				tableName={this.props.table.name}
				prikey={this.props.values.prikey}
				lastmodifdate={this.props.values[LASTMODIF_DATE_ALIAS]}
				createddate={this.props.values[CREATED_DATE_ALIAS]}
			/>
		);
		
		if (this.props.table.isSelfTree) {
			const breadcrumb = this.props.values.breadcrumb ? this.props.values.breadcrumb : '0';
			const level = this.props.values.level ? this.props.values.level : '0';
			return (
				<tr className={`selfjoin-row level-${level}`}>
					
					<td className="selfjoin-breadcrumb">{breadcrumb}</td>
					<td className="selfjoin-label">
						{
							this.props.fields.map((field, index) => {
								// console.log(field);

								return <span key={index}>{ this.props.values[field.listAlias] }</span>;
							})
						}
					</td>
					{ modifCell }
					{ orderCell }
				</tr>
			);
		}

		return (
			<tr>
				{
					this.props.fields.map((field, index) => {
						let val = this.props.values[field.listAlias];
						if (field.type === 'img' || field.type === 'file') {
							val = <FileThumbnail val={this.props.values[field.listAlias]} dir={field.folder} env={this.props.env} type={field.type} />;
						}
						return <td key={index}>{ val }</td>;
					})
				}
				{ modifCell }
				{ orderCell }
			</tr>
		);
	}
}
