import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { transparentModal } from '../styles/Modal.js';
import { Button } from '../styles/Button';
import { ErrorCtn, ErrorHeading, ErrorContent, ContactAdminMessage, closeBtn, errorIcon } from '../styles/ErrorCtn';
import { Heading4 } from '../styles/Texts.js';
import SingleError from './SingleError.jsx';
import { Icon } from '../styles/Icon.js';

export default class Errors extends Component {
	static propTypes = {
		errors: PropTypes.array,

		clearErrors: PropTypes.func,
		goTo: PropTypes.func,
		isGod: PropTypes.bool,
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
				ariaHideApp={false}
				closeTimeoutMS={300}
				contentLabel="."
				style={transparentModal}
			>
				<ErrorCtn>
					<ErrorHeading>
						<Heading4><Icon style={errorIcon} icon="exclamation-circle" side="left" /> {this.props.errors.length === 1 ? 'An error has occured' : 'Errors have occured'}</Heading4>
						<Button onClick={this.closeModal} style={closeBtn}><Icon icon="times" side="center" /></Button>
					</ErrorHeading>
					<ErrorContent>
					{
						this.props.errors.map((err, index) => {
							const { message, details } = err;
							// console.log(err);
							return (
								<SingleError message={message} errorDetails={details} key={index} isGod={this.props.isGod} />
							);
						})
					}
					{
						!this.props.isGod &&
							<ContactAdminMessage>Please contact your website’s administrator.</ContactAdminMessage>
					}
					</ErrorContent>
				</ErrorCtn>
			</Modal>
		);
	}
}
