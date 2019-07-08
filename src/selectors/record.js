
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';

const recordIdSelector = (state, props) => props.recordId;
const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;
const tableIdSelector = (state, props) => props.tableId;
const collapsedStateSelector = state => state.freestone.fieldgroup.collapsedState;

const recordsUnalteredSelector = state => state.freestone.recordForm.recordsUnaltered;
const recordsSelector = state => state.freestone.recordForm.records;

function makeTableRecordSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, recordsSelector],
		(schema, records) => {
			const { table } = schema;
			return table && records[table.id];
		}
	);
}

function makeRecordSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, recordsSelector, recordIdSelector],
		(schema, records, recordId) => {
			const { table } = schema;
			// console.log(`%c record ${recordId}`, 'font-weight:bold;color:#449944;');
			return recordId && table && records[table.id] && records[table.id][recordId];
		}
	);
}

function makeParentRecordSelector() {
	return createSelector(
		[parentTableIdSelector, recordsSelector, parentRecordIdSelector],
		(parentTableId, records, parentRecordId) => {
			return parentRecordId && records[parentTableId] && records[parentTableId][parentRecordId];
		}
	);
}

function makeRecordUnalteredSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, recordsUnalteredSelector, recordIdSelector],
		(schema, recordsUnaltered, recordId) => {
			const { table } = schema;
			// console.log(`%c record unaltered ${recordId}`, 'font-weight:bold;color:#449944;');
			return recordId && table && recordsUnaltered[table.id] && recordsUnaltered[table.id][recordId];
		}
	);
}

function makeActiveGroupSelector() {
	return createSelector(
		[tableIdSelector, collapsedStateSelector],
		(tableId, collapsedState) => {
			// console.log(collapsedState, tableId);
			return collapsedState && collapsedState[tableId];
		}
	);
}

export function tableRecordsMapStateToProps() {
	const selectorInst = makeTableRecordSelector(tableSchemaMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

export function recordMapStateToProps() {
	const selectorInst = makeRecordSelector(tableSchemaMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

export function parentRecordMapStateToProps() {
	const selectorInst = makeParentRecordSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}

export function recordUnalteredMapStateToProps() {
	const selectorInst = makeRecordUnalteredSelector(tableSchemaMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

export function activeGroupMapStateToProps() {
	const selectorInst = makeActiveGroupSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
