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
	
	// // console.log(this.props.saveState);
	// const isError = this.props.saveState && !!this.props.saveState.status.error;
	// let msgDisplay = null;
	// if (isError) {
	// 	msgDisplay = (<div>
	// 		<ErrorTitle>{this.props.saveState.status.msg}</ErrorTitle>
	// 		<ErrorMessage>{this.props.saveState.status.error}</ErrorMessage>
	// 		<Button onClick={this.props.cancelSave} danger="true"><Icon icon="pencil-alt" /> <span>Go back to form</span></Button>
	// 	</div>);
	// } else {
	// 	msgDisplay = (<div>
	// 		{this.props.saveState && this.props.saveState.status.msg}
	// 	</div>);
	// }

	// if (this.props.isTemporary) return msgDisplay;

	return (
		<section className="saving">
			<Heading2>Saved {nRecordTotal - props.nRecords} / {nRecordTotal}</Heading2>
		</section>
	);
}

SaveQuickedit.propTypes = {
	tableId: PropTypes.number,
	table: PropTypes.object,
	records: PropTypes.object,
	tree: PropTypes.object,
	nRecords: PropTypes.number,

	saveQuickedit: PropTypes.func,
	onSaved: PropTypes.func,
};
