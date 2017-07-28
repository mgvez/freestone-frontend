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
					<th>Level</th>
					<th>Item</th>
					<th>Functions</th>
				</tr>
			);
		}
		//sinon, une cell pour chaque field de recherche. Si aucun, en ajoute un vide pour mettre le label du record dedans
		// console.log(this.props.fields);
		let cells;
		if (this.props.fields.length) {
			cells = this.props.fields.map((field) => {
				if (field.isGroup) return null;
				return <th key={`fld_${field.id}`}>{field.label}</th>;
			});
		} else {
			cells = <th />;
		}
		return (
			<tr>
				{cells}
				<th>Functions</th>
			</tr>
		);

	}
}
