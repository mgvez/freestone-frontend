import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from 'components/styles/modalStyles.js';

import * as errorsActionCreators from 'actions/errors';

@connect(
	state => {
		return { errors: state.errors };
	},
	dispatch => bindActionCreators(errorsActionCreators, dispatch)
)
export class Errors extends Component {
	static propTypes = {
		errors: React.PropTypes.array,
		clearErrors: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	closeModal = () => {
		this.props.clearErrors();
	};
	
	// printObject(obj, lev = 0, carry = []) {
	// 	if (typeof obj === 'object') {
	// 		return Object.keys(obj).map(prop => {
	// 			const val = this.printObject(obj[prop], lev + 1);
	// 			const style = {
	// 				paddingLeft: lev * 10,
	// 			};
	// 			return (
	// 				<div style={style} key={prop}>
	// 					<strong>{prop}</strong> : 
	// 					{val}
	// 				</div>
	// 			);
	// 		});
	// 	}
	// 	carry.push(<pre>{obj}</pre>);
	// 	return carry;
	// }

	render() {
		if (!this.props.errors.length) return null;
		// console.log('errors');
		return (
			<Modal
				isOpen
				closeTimeoutMS={300}
				style={customStyle}
			>
				{
					this.props.errors.map((err, index) => {
						const { message, details } = err;
						// console.log(err);
						const nodes = [<div key={index} dangerouslySetInnerHTML={ { __html: message } } />];
						if (details && typeof details === 'object') {
							const detailsPrint = JSON.stringify(details, null, 2).replace(/\\t/g, '	').replace(/\\n/g, '\n').replace(/\\r/g, '');//this.printObject(details);
							nodes.push(<pre key={`${index}_details`}>{detailsPrint}</pre>);
						}
						return nodes;
					})
				}
				<button onClick={this.closeModal}>OK</button>

			</Modal>
		);
	}
}
