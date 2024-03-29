import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TYPE_MTM } from '../../../freestone/schemaProps';

import SubformMtm from '../../../containers/form/subform/SubformMtm';
import SubformStandard from '../../../containers/form/subform/SubformStandard';
import { LOCATIONS } from '../buttons/EditSchema';
import EditSchema from '../../../containers/form/buttons/EditSchema';

export default function Subform(props) {

	useEffect(() => {
		const { tableId } = props;
		if (!props.table) props.fetchTable(tableId);
	}, [props.table, props.tableId]);

	const changeCollapsedState = useCallback(() => {
		props.setSubformCollapsed(props.tableId, !props.isCollapsed);
	}, [props.tableId, props.isCollapsed]);

	if (!props.table) return null;
	if (props.table.type === TYPE_MTM) {
		return (<SubformMtm
			tableId={props.tableId}
			parentRecordId={props.parentRecordId}
			parentTableId={props.parentTableId}
			isCollapsed={props.isCollapsed}
			changeCollapsedState={changeCollapsedState}
			titleOverride={props.titleOverride}
			descriptionAppend={props.descriptionAppend}
			editSchema={() => [
				<EditSchema key={`s_${props.tableId}`} table={props.tableId} location={LOCATIONS.SUBFORM} />,
			]}
		/>);
	}
	// console.log(`render ${props.tableId}`);

	return (<SubformStandard
		tableId={props.tableId}
		parentRecordId={props.parentRecordId}
		parentTableId={props.parentTableId}
		isCollapsed={props.isCollapsed}
		changeCollapsedState={changeCollapsedState}
		titleOverride={props.titleOverride}
		descriptionAppend={props.descriptionAppend}
		language={props.language}
		editSchema={() => [
			<EditSchema key={`s_${props.tableId}`} table={props.tableId} location={LOCATIONS.SUBFORM} />,
		]}
	/>);
}

Subform.propTypes = {
	tableId: PropTypes.number,
	parentTableId: PropTypes.number,
	parentRecordId: PropTypes.string,
	language: PropTypes.string,
	titleOverride: PropTypes.string,
	descriptionAppend: PropTypes.string,

	isCollapsed: PropTypes.bool,
	table: PropTypes.object,

	fetchTable: PropTypes.func,
	setSubformCollapsed: PropTypes.func,
};
