import React, { Component } from 'react';


export class Heading extends Component {
	static propTypes = {
		fields: React.PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
				<th>No.</th>
				{
					this.props.fields.map((field, index) => {
						return <th key={index}>{ field.label }</th>;
					})
				}
				<th>Modification</th>
			</tr>
		);
	}
}
