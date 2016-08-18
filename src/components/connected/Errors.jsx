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
		const isFatal = this.props.errors.reduce((status, e) => status || e.isFatal, false);
		const redirectingError = this.props.errors.find(e => !!e.redirectOnError);
		//si l'erreur demande une redirection OU que c'est une erreur fatale (dans ce cas on redirect vers default)
		const redirect = (redirectingError && redirectingError.redirectOnError) || (isFatal && '/');
		this.props.clearErrors();
		if (redirect) this.props.goTo(redirect);
	};

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
						const nodes = [<div key={index} dangerouslySetInnerHTML={{ __html: message }} />];
						if (details && typeof details === 'object') {
							const detailsPrint = JSON.stringify(details, null, 2).replace(/\\t/g, '	').replace(/\\n/g, '\n').replace(/\\r/g, '');//this.printObject(details);
							nodes.push(<pre key={`${index}_details`}>{detailsPrint}</pre>);
						}
						return nodes;
					})
				}

				<button onClick={this.closeModal}>Close</button>

			</Modal>
		);
	}
}
