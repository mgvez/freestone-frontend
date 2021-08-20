import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import SubformTabbed from './SubformTabbed';
import SubformStacked from './SubformStacked';
import PreviewsStacked from './PreviewsStacked';
import SubformList from './SubformList';
import SubformSingle from './SubformSingle';

import { 
	SUBFORM_VIEW_LIST,
	SUBFORM_VIEW_STACKED,
	SUBFORM_PREVIEW_MODE_PREVIEWS,
	TYPE_SUBFORM,
	TYPE_OTO,
	TYPE_OTO_GUID,
	TYPE_SUBFORM_GUID,
} from '../../../freestone/schemaProps';

/*
Regular children records (i.e. not mtm), will choose view depending on user preference
*/
export default function SubformStandard(props) {

	const { table, tableId, parentRecordId, parentTableId, childrenRecords } = props;

	useEffect(() => {
		if (!table) {
			props.fetchTable(tableId);
		} else {
			const tableName = table.name;
			if (!childrenRecords) {
				// console.log(`fetch record ${tableName}.${parentRecordId}`);
				props.fetchRecord(tableName, parentRecordId, parentTableId);
			}
		}
	}, [tableId, parentRecordId, parentTableId, childrenRecords, table]);

	const swapRecords = useCallback((originId, targetId) => {
		const orderFieldId = table.orderField && table.orderField.id;
		if (!orderFieldId) return;

		const originIdx = childrenRecords.findIndex(el => el.id === originId);
		const targetIdx = childrenRecords.findIndex(el => el.id === targetId);

		const item = childrenRecords[originIdx];
		const dest = [
			...childrenRecords.slice(0, originIdx),
			...childrenRecords.slice(+originIdx + 1),
		];
		dest.splice(targetIdx, 0, item);

		props.setOrder(tableId, orderFieldId, dest);
		// console.log(props.childrenRecords);
		// console.log(dest);
	}, [table, childrenRecords]);

	if (!table) return null;
	if (table.type === TYPE_SUBFORM || table.type === TYPE_SUBFORM_GUID) {
		const currentViewType = props.currentViewType || props.defaultViewType;
		const { previewMode } = props;
		if (previewMode === SUBFORM_PREVIEW_MODE_PREVIEWS) {
			return <PreviewsStacked {...props} swapRecords={swapRecords} />;
		} else if (currentViewType === SUBFORM_VIEW_LIST) {
			return <SubformList {...props} swapRecords={swapRecords} />;
		} else if (currentViewType === SUBFORM_VIEW_STACKED) {
			return <SubformStacked {...props} swapRecords={swapRecords} />;
		}
		return <SubformTabbed {...props} swapRecords={swapRecords} />;
		
	} else if (table.type === TYPE_OTO || table.type === TYPE_OTO_GUID) {
		return <SubformSingle {...props} />;
	}
	return null;

}

SubformStandard.propTypes = {
	tableId: PropTypes.number,
	table: PropTypes.object,
	activeRecords: PropTypes.array,
	childrenRecords: PropTypes.array,
	parentTableId: PropTypes.number,
	parentRecordId: PropTypes.string,
	highestOrder: PropTypes.number,
	currentViewType: PropTypes.string,
	previewMode: PropTypes.string,
	defaultViewType: PropTypes.string,
	language: PropTypes.string,
	isCollapsed: PropTypes.bool,
	titleOverride: PropTypes.string,
	descriptionAppend: PropTypes.string,
	
	fetchTable: PropTypes.func,
	fetchRecord: PropTypes.func,
	setOrder: PropTypes.func,
	setShownRecord: PropTypes.func,
	toggleShownRecord: PropTypes.func,
	changeCollapsedState: PropTypes.func,
};
