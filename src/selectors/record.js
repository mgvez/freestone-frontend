
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';
import { PRIKEY_ALIAS } from '../freestone/schemaProps';

const recordIdSelector = (state, props) => (props.recordId || props.values && props.values[PRIKEY_ALIAS]);
const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;
const tableIdSelector = (state, props) => props.tableId;
const tableSelector = (state, props) => props.table;
const visibleStateSelector = state => state.freestone.fieldgroup.visibleState;

const recordsUnalteredSelector = state => state.freestone.recordForm.recordsUnaltered;
const recordsSelector = state => state.freestone.recordForm.records;
const recordsQuickeditSelectorRaw = state => state.freestone.recordQuickedit;

function makeTableRecordSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, recordsSelector],
		(table, records) => {
			return table && records[table.id];
		}
	);
}

function makeRecordSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, recordsSelector, recordIdSelector],
		(table, records, recordId) => {
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
		(table, recordsUnaltered, recordId) => {
			// console.log(`%c record unaltered ${recordId}`, 'font-weight:bold;color:#449944;');
			return recordId && table && recordsUnaltered[table.id] && recordsUnaltered[table.id][recordId];
		}
	);
}

function makeActiveGroupSelector() {
	return createSelector(
		[tableIdSelector, visibleStateSelector],
		(tableId, visibleState) => {
			// console.log(collapsedState, tableId);
			return visibleState && visibleState[tableId];
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

function makeSingleSelector(recordSelector) {
	return createSelector([recordSelector], (record) => {
		return { record };
	});
}
export function singleRecordMapStateToProps() {
	const selectorInst = makeSingleSelector(
		recordMapStateToProps(),
	);
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


function makeTableRecordQuickeditSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, tableSelector, recordsQuickeditSelectorRaw],
		(tableSchema, resolvedTable, records) => {
			const table = resolvedTable || tableSchema;
			return table && records[table.id];
		}
	);
}


export const makeTableRecordsQuickeditMapStateToProps = () => {
	const selectorInst = makeTableRecordQuickeditSelector(tableSchemaMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
};


export function makeRecordQuickeditSelector() {
	const tableRecordQuickeditSelector = makeTableRecordsQuickeditMapStateToProps();
	return createSelector(
		[tableRecordQuickeditSelector, recordIdSelector],
		(tableRecords, recordId) => {
			return {
				quickeditedRecord: tableRecords && tableRecords[recordId],
			};
		}
	);
}

export function makeRecordParsedSelector() {
	const schemaSelectorInst = tableSchemaMapStateToProps();
	const recordSelectorInst = makeRecordSelector(schemaSelectorInst);

	return createSelector(
		[schemaSelectorInst, recordSelectorInst],
		(table, record) => {
			const parsedRecord = record && table && table.fields && table.fields.reduce((mounted, field) => {
				mounted[field.name] = record[field.id];
				return mounted;
			}, {});
			return parsedRecord;
		}
	);
}

