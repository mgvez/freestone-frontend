import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { MODAL_TRANSITION_MS } from '../../styles/Modal';
import { ErrorTitle, ErrorMessage } from '../../styles/Texts';


export default function SaveQuickedit(props) {

	const [nRecordTotal] = useState(props.builtRecords.length);

	// init save with first list of records passed
	useEffect(() => {
		const t = setTimeout(() => {
			props.saveQuickedit(props.table, props.builtRecords, props.onSaved);
		}, MODAL_TRANSITION_MS);
		return () => clearTimeout(t);
	}, []);
	
	const isError = props.saveState && !!props.saveState.status.error;
	let msgDisplay = null;
	if (isError) {
		msgDisplay = (<div>
			<ErrorTitle>{props.saveState.status.msg}</ErrorTitle>
			<ErrorMessage>{props.saveState.status.error}</ErrorMessage>
		</div>);
	} else {
		msgDisplay = (<div>
			Saved {nRecordTotal - props.builtRecords.length} / {nRecordTotal}
		</div>);
	}

	return (
		<section className="saving">
			{msgDisplay}
		</section>
	);
}

SaveQuickedit.propTypes = {
	tableId: PropTypes.number,
	table: PropTypes.object,
	builtRecords: PropTypes.arrayOf( 
		PropTypes.shape({
			records: PropTypes.object,
			tree: PropTypes.object,
		}),
	),
	saveState: PropTypes.object,
	nRecords: PropTypes.number,

	saveQuickedit: PropTypes.func,
	onSaved: PropTypes.func,
};
