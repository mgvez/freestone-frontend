
import { createSelector } from 'reselect';
import { PRIKEY_ALIAS, GUID_FIELD } from '../freestone/schemaProps';
import { tableSchemaMapStateToProps } from './tableSchema';
import { parentRecordSelector } from './formChildrenRecords';


const tableIdSelector = (state, props) => { 
	return props.tableId || (props.table && props.table.id);
};
const visibleStateSelector = state => state.freestone.subform.visibleState;
const collapsedStateSelector = state => state.freestone.subform.collapsedState;
const viewStateSelector = state => state.freestone.subform.viewState;

export const subformViewSelector = createSelector(
	[tableIdSelector, viewStateSelector],
	(tableId, viewState) => {
		return {
			currentViewType: viewState[tableId],
		};
	}
);

function makeIsCollapsedSelector() {
	return createSelector(
		[tableIdSelector, collapsedStateSelector],
		(tableId, collapsedState) => {
			// console.log('process... %s', tableId);
			return {
				isCollapsed: collapsedState[tableId],
			};
		}
	);
}

function makeIsVisibleSelector() {
	return createSelector(
		[tableIdSelector, visibleStateSelector],
		(tableId, visibleState) => {
			// console.log('process... %s', tableId);
			return {
				isVisible: visibleState[tableId],
			};
		}
	);
}

function formCollapsedMapStateToProps() {
	const selectorInst = makeIsCollapsedSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}

function formVisibleMapStateToProps() {
	const selectorInst = makeIsVisibleSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}


function makeSubformSelector(tableSchemaSelector, formVisibleSelector, formCollapsedSelector) {
	return createSelector(
		[tableSchemaSelector, formVisibleSelector, formCollapsedSelector],
		(table, formVisible, formCollapsed) => {
			return {
				table,
				...formVisible,
				...formCollapsed,
			};
		}
	);
}

export function subformMapStateToProps() {
	const selectorInst = makeSubformSelector(tableSchemaMapStateToProps(), formVisibleMapStateToProps(), formCollapsedMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}


const tableSelector = (state, props) => props && props.table;
const parentTableIdSelector = (state, props) => props && props.parentTableId;
// returns the value to add to a subform link field, tha links to its parent. Normally it's the parent's primary key, but in the case of guid foreigns it's the parent's GUID value, if it exists.
function makeAddRecordSelector() {
	return createSelector(
		[tableSelector, parentTableIdSelector, parentRecordSelector],
		(table, parentTableId, parentRecord) => {
			// the field, on the child table, that links to the parent.
			const parentLinkField = table && table.parentLink && table.parentLink[parentTableId];
			
			// if foreign link is not directly on parent table, and we have a free foreign, and a free foreign is the link to parent return parent guid
			// if it exists. If not, use parent id, as it is a simili-guid (new record identifier)
			if (
				parentLinkField
				&& parentLinkField.foreign
				&& parentLinkField.foreign.foreignTableId !== parentTableId
				&& parentLinkField.foreign.freeforeigns
			) {
				const parentLinkFieldFreeForeign = parentLinkField.foreign.freeforeigns.find(ff => ff.foreignTableId === parentTableId);
				if (parentLinkFieldFreeForeign) {
					return {
						linkValue: parentRecord[GUID_FIELD] || parentRecord[PRIKEY_ALIAS],
					};
				}
			}
			
			// if field is a direct link to record id, it will have a simple foreign to it, we don't need any more info (we already have parent record ID)
			return {
				linkValue: parentRecord[PRIKEY_ALIAS],
			};
		}
	);
}

export function addRecordMapStateToProps() {
	const selectorInst = makeAddRecordSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
