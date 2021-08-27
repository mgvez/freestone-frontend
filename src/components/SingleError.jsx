import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { SingleErrorCtn, ErrorMessage, ErrorDetailsCtn } from '../styles/ErrorCtn';
import { Button } from '../styles/Button';

const BUTTON_LABEL = {
	SHOW: 'Show details',
	HIDE: 'Hide details',
};

export default function SingleError({ key, message, errorDetails, isGod }) {
	const [details, setDetails] = useState({
		isOpen: false,
		buttonLabel: BUTTON_LABEL.SHOW,
	});

	const handleClick = () => {
		if (details.isOpen) {
			setDetails({
				isOpen: false,
				buttonLabel: BUTTON_LABEL.SHOW,
			});
		} else {
			setDetails({
				isOpen: true,
				buttonLabel: BUTTON_LABEL.HIDE,
			});
		}
	};

	return (
		<SingleErrorCtn>
			<ErrorMessage>{message}</ErrorMessage>
			{isGod &&
			!!errorDetails &&
			(
				<React.Fragment>
					{details.isOpen && (
						<ErrorDetailsCtn>
							{
								typeof errorDetails === 'object' ?
								(<pre key={`${key}_details`}>{JSON.stringify(errorDetails, null, 2).replace(/\\t/g, '	').replace(/\\n/g, '\n').replace(/\\r/g, '')}</pre>) :
								(<div 
									dangerouslySetInnerHTML={{
										__html: errorDetails,
									}}
								>
								</div>)
							}
							
						</ErrorDetailsCtn>
					)}
					<Button onClick={handleClick}>{details.buttonLabel}</Button>
				</React.Fragment>
			)
			}
		</SingleErrorCtn>
	);
}

SingleError.propTypes = {
	key: PropTypes.string,
	message: PropTypes.string,
	errorDetails: PropTypes.string,
	isGod: PropTypes.bool,
};
