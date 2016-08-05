import React, { Component } from 'react';


export class Heading extends Component {
	static propTypes = {
		fields: React.PropTypes.array,
		isSelfTree: React.PropTypes.bool,
	};

	render() {
		//si self tree, cells par defaut
		if (this.props.isSelfTree) {
			return (
				<tr>
					<th>Infos</th>
					<th>Level</th>
					<th>Item</th>
					<th>Functions</th>
				</tr>
			);
		}
		//sinon, une cell pour chaque field de recherche
		return (
			<tr>
				<th>Infos</th>
				{
					this.props.fields.map((field, index) => {
						if (field.isGroup) return null;
						return <th key={index}>{field.label}</th>;
					})
				}
				<th>Functions</th>
			</tr>
		);

	}
}
