import React, { Component } from 'react';
import { Link } from 'react-router';


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
		const recordLink = `../main.php?i=${this.props.values.prikey}&t=${this.props.table.name}`;
		const created = this.props.values.createddate || 'unknown';
		const modified = this.props.values.lastmodifdate || 'unknown';
		return (
			<tr>
				<td>
					<Link to={`/edit/${this.props.table.name}/${this.props.values.prikey}`} activeClassName="active" className="btn btn-xs">Edit</Link>
					<button className="btn btn-xs">Delete</button>
				</td>
				{
					this.props.fields.map((field, index) => {
						return <td key={index}>{ this.props.values[field.listAlias] }</td>;
					})
				}
				<td>
					created { created }<br/>
					modified { modified },
					<em><a target="_blank" href={recordLink}>{ this.props.values.prikey }</a></em>
				</td>
			</tr>
		);
	}
}
