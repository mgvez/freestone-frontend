import React, { Component } from 'react';
import { Link } from 'react-router';

import { OrderFcn } from 'components/RecordList/OrderFcn';
import { PRIKEY_ALIAS, LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS } from 'freestone/SchemaProps';


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
		const recordLink = `../main.php?i=${this.props.values[PRIKEY_ALIAS]}&t=${this.props.table.name}`;
		const created = this.props.values[CREATED_DATE_ALIAS] || 'unknown';
		const modified = this.props.values[LASTMODIF_DATE_ALIAS] || 'unknown';

		let orderCell;
		if (this.props.table.hasOrder) {
			orderCell = <OrderFcn />;
		}

		return (
			<tr>
				{
					this.props.fields.map((field, index) => {
						return <td key={index}>{ this.props.values[field.listAlias] }</td>;
					})
				}
				<td>
					<Link to={`/edit/${this.props.table.name}/${this.props.values[PRIKEY_ALIAS]}`} activeClassName="active" className="btn btn-xs">Edit</Link>
					<button className="btn btn-xs">Delete</button>
				</td>
				{ orderCell }
				<td>
					created { created }<br/>
					modified { modified },
					<em><a target="_blank" href={recordLink}>{ this.props.values[PRIKEY_ALIAS] }</a></em>
				</td>
			</tr>
		);
	}
}
