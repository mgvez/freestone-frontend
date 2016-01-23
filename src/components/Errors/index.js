import React, { Component } from 'react';


export class Errors extends Component {
	static propTypes = {
		errors: React.PropTypes.array,
		clearAll: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.clearAll = this.clearAll.bind(this);
	}

	clearAll(e) {
		e.preventDefault();
		this.props.clearAll();
	}

	render() {

		let clearBtn;
		if (this.props.errors.length) {
			clearBtn = (
				<button className="btn btn-sm" onClick={this.clearAll}>
					Clear all
				</button>
			);
		}

		return (
			<div>
			{
				this.props.errors.map((err, index) => {
					return <div key={index} dangerouslySetInnerHTML={ { __html: err } } />;
				})
			}
			{ clearBtn }
			</div>
		);
	}
}
