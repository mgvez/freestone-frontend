import React, { Component } from 'react';


export class Errors extends Component {
	static propTypes = {
		errors: React.PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			{
				this.props.errors.map((err, index) => {
					return <div key={index} dangerouslySetInnerHTML={ { __html: err } } />;
				})
			}
			</div>
		);
	}
}
