import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { swapOrder } from 'actions/save';

@connect(
	null,
	dispatch => bindActionCreators({ swapOrder }, dispatch)
)
export class OrderFcn extends Component {
	static propTypes = {
		prikey: React.PropTypes.string,
		tableName: React.PropTypes.string,
		swapOrder: React.PropTypes.func,
	};

	swapOrder(direction) {
		// console.log('swap', this.props.tableName, this.props.prikey, direction);
		this.props.swapOrder(this.props.tableName, this.props.prikey, direction);
	}

	swapOrderUp = () => {
		this.swapOrder(-1);
	};

	swapOrderDown = () => {
		this.swapOrder(1);
	};

	render() {
				
		return (
			<div>
				<a className="button-circle fa fa-arrow-up" onClick={this.swapOrderUp}></a>
				<a className="button-circle fa fa-arrow-down" onClick={this.swapOrderDown}></a>
			</div>
		);
	}
}
