import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from '../../../styles/Colors';
import { Icon } from '../../../styles/Icon';

const OrderContainer = styled.div`
	display: inline-block;
	vertical-align: middle;

	.ctaup {
		margin-bottom: 10px;
	}

	i {
		display: block;
		text-align: center;

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
				<div className="ctaup" onClick={this.swapOrderUp} key="ctaup"><Icon icon="arrow-up" cta side="center" /></div>
				<div onClick={this.swapOrderDown} key="ctadown"><Icon icon="arrow-down" side="center" onClick={this.swapOrderDown} cta /></div>
			</OrderContainer>
		);
	}
}
