import React, { Component } from 'react';


export class Heading extends Component {
	static propTypes = {
		fields: React.PropTypes.array,
		hasOrder: React.PropTypes.bool,
		isSelfTree: React.PropTypes.bool,
	};

	constructor(props) {
		super(props);
	}

	render() {

		let orderCell;
		if (this.props.hasOrder) {
			orderCell = (<th>Order</th>);
		}

		let fieldsCells;
		//si self tree, cells par defaut
		if (this.props.isSelfTree) {
			return (
				<tr>
					<th>Level</th>
					<th>Item</th>
					{ orderCell }
					<th>Fcn</th>
				</tr>
			);
		}
		//sinon, une cell pour chaque field de recherche
		return (
			<tr>
				{
					this.props.fields.map((field, index) => {
						return <th key={index}>{ field.label }</th>;
					})
				}
				{ orderCell }
				<th>Fcn</th>
			</tr>
		);

	}
}
