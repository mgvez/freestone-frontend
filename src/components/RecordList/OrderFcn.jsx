import React, { Component } from 'react';


export class OrderFcn extends Component {
	static propTypes = {
		prikey: React.PropTypes.string,
		tableName: React.PropTypes.string,
		swapOrder: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	swapOrder(direction) {
		// console.log('swap', this.props.tableName, this.props.prikey, direction);
		this.props.swapOrder(this.props.tableName, this.props.prikey, direction);
	}

	swapOrderUp = (e) => {
		this.swapOrder(-1);
	};

	swapOrderDown = (e) => {
		this.swapOrder(1);
	};

	render() {
				
		return (
			<td>
				<a className="fa fa-arrow-circle-up" onClick={this.swapOrderUp}>&nbsp;</a>
				<a className="fa fa-arrow-circle-down" onClick={this.swapOrderDown}>&nbsp;</a>
			</td>
		);
	}
}
