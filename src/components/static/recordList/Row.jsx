import React, { Component } from 'react';
import { Link } from 'react-router';

import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { InfosFcn } from 'components/static/recordList/InfosFcn';
import { OrderFcn } from 'components/connected/recordList/OrderFcn';
import { DeleteBtn } from 'components/connected/recordList/DeleteBtn';

import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS } from 'freestone/schemaProps';

export class Row extends Component {
	static propTypes = {
		table: React.PropTypes.object,
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

		const modifCell = (
			<td className="list-functions">
				<Link to={`/edit/${this.props.table.name}/${this.props.values.prikey}`} activeClassName="active" className="btn btn-primary btn-sm"><i className="fa fa-pencil"></i><span> Edit</span></Link>
				<DeleteBtn tableName={this.props.table.name} prikey={this.props.values.prikey} />
			</td>
		);
		const infoCell = (
			<InfosFcn
				tableName={this.props.table.name}
				prikey={this.props.values.prikey}
				lastmodifdate={this.props.values[LASTMODIF_DATE_ALIAS]}
				createddate={this.props.values[CREATED_DATE_ALIAS]}
			/>
		);
		// console.log(this.props.values);
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
							val = <FileThumbnail val={this.props.values[field.listAlias]} dir={field.folder} type={field.type} />;
						}
						return <td key={index}>{ val }</td>;
					})
				}
				{ modifCell }
				{ orderCell }
				{ infoCell }
			</tr>
		);
	}
}
