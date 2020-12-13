import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Header, HeaderTexts } from '../../styles/Header';
import { Button } from '../../styles/Button';
import { Heading2, ErrorTitle, ErrorMessage } from '../../styles/Texts';


export default function SaveQuickedit(props) {

	const [nRecordTotal] = useState(props.nRecords);

	// console.log(props);
	useEffect(() => {
		const onSaved = props.saveQuickedit(props.table, props.tree, props.records, props.onSaved);
	}, [props.table, props.records, props.tree, props.onSaved]);
	
	const isError = props.saveState && !!props.saveState.status.error;
	let msgDisplay = null;
	if (isError) {
		msgDisplay = (<div>
			<ErrorTitle>{props.saveState.status.msg}</ErrorTitle>
			<ErrorMessage>{props.saveState.status.error}</ErrorMessage>
		</div>);
	} else {
		msgDisplay = (<div>
			Saved {nRecordTotal - props.nRecords} / {nRecordTotal}
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
	records: PropTypes.object,
	tree: PropTypes.object,
	saveState: PropTypes.object,
	nRecords: PropTypes.number,

	saveQuickedit: PropTypes.func,
	onSaved: PropTypes.func,
};
