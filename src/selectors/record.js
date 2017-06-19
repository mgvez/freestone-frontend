
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';

const recordIdSelector = (state, props) => props.recordId;
const recordsUnalteredSelector = state => state.recordForm.recordsUnaltered;
const recordsSelector = state => state.recordForm.records;

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

export function recordUnalteredMapStateToProps() {
	const selectorInst = makeRecordUnalteredSelector(tableSchemaMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}
