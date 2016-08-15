import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from 'components/styles/modalStyles.js';

import * as errorsActionCreators from 'actions/errors';
import { goTo } from 'actions/nav';

@connect(
	state => {
		return { errors: state.errors };
	},
	dispatch => bindActionCreators({ ...errorsActionCreators, goTo }, dispatch)
)
export class Errors extends Component {
	static propTypes = {
		errors: React.PropTypes.array,

		clearErrors: React.PropTypes.func,
		goTo: React.PropTypes.func,
	};

	closeModal = () => {
		this.props.clearErrors();
	};

	closeFatal = () => {
		this.props.goTo('/');
		this.props.clearErrors();
	};

	render() {
		if (!this.props.errors.length) return null;
		// console.log('errors');
		const isFatal = this.props.errors.reduce((status, e) => status || e.isFatal);

		//if fatal error, we need to refresh
		let closeModal = isFatal ? this.closeFatal : this.closeModal;

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
						const nodes = [<div key={index} dangerouslySetInnerHTML={{ __html: message }} />];
						if (details && typeof details === 'object') {
							const detailsPrint = JSON.stringify(details, null, 2).replace(/\\t/g, '	').replace(/\\n/g, '\n').replace(/\\r/g, '');//this.printObject(details);
							nodes.push(<pre key={`${index}_details`}>{detailsPrint}</pre>);
						}
						return nodes;
					})
				}

				<button onClick={closeModal}>Close</button>

			</Modal>
		);
	}
}
