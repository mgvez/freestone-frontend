
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';
import { transparentModal, MODAL_TRANSITION_MS } from '../../styles/Modal.js';

const MSG_MINIMUM_TIME_MS = 1500;
const TOTAL_IN_TIME = MSG_MINIMUM_TIME_MS + MODAL_TRANSITION_MS;

export default function AjaxModal(props) {

	const [isProcessed, setIsProcessed] = useState(false);
	const [startTime] = useState(new Date());
	const onKilled = useCallback(() => {
		props.onClosed();
	}, [props.onClosed]);

	const onFinish = useCallback(() => {
		const elapsed = (new Date()) - startTime;
		if (elapsed < TOTAL_IN_TIME) {
			setTimeout(() => {
				setIsProcessed(true);
			}, TOTAL_IN_TIME - elapsed);
		} else {
			setIsProcessed(true);
		}
	}, [startTime, setIsProcessed]);

	return (
		<Modal
			isOpen={!isProcessed}
			ariaHideApp={false}
			closeTimeoutMS={MODAL_TRANSITION_MS}
			contentLabel="."
			style={transparentModal}
			onAfterClose={onKilled}
		>
			{props.children(onFinish)}
		</Modal>
	);

}

AjaxModal.propTypes = {
	onClosed: PropTypes.func,
	children: PropTypes.func,
};
