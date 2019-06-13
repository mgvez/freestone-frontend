import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from '../../../styles/Colors';

const OrderContainer = styled.div`
	margin-left: 20px;
	display: inline-block;
	vertical-align: middle;
	a {
		color: ${colors.accentPrimary};
		display: block;
		text-align: center;
		cursor: pointer;

		& + a {
			margin-top: 20px
		}

		&:hover {
			text-decoration: none;
		}
	}
`;
export default class OrderFcn extends Component {
	static propTypes = {
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		swapOrder: PropTypes.func,
		fetchRecords: PropTypes.func,
	};

	swapOrder(direction) {
		// console.log('swap', this.props.tableName, this.props.prikey, direction);
		this.props.swapOrder(this.props.tableName, this.props.prikey, direction, this.props.fetchRecords);
	}

	swapOrderUp = () => {
		this.swapOrder(-1);
	};

	swapOrderDown = () => {
		this.swapOrder(1);
	};

	render() {
				
		return (
			<OrderContainer>
				<a className="fa fa-arrow-up" onClick={this.swapOrderUp}></a>
				<a className="fa fa-arrow-down" onClick={this.swapOrderDown}></a>
			</OrderContainer>
		);
	}
}
