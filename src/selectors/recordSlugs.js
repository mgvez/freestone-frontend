
import { createSelector } from 'reselect';

const recordIdSelector = (state, props) => props.recordId || (props.params && props.params.recordId);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId) || (props.table && props.table.id);
const slugsSelector = state => state.freestone.slugs;
const recordsSelector = state => state.freestone.recordForm.records;
import { tableSchemaMapStateToProps } from './tableSchema';

function makeSlugSelector() {
	return createSelector(
		[tableIdSelector, recordIdSelector, slugsSelector],
		(tableId, recordId, allSlugs) => {
			// console.log(tableId, recordId, allSlugs);
			return allSlugs[tableId] && allSlugs[tableId][recordId] && allSlugs[tableId][recordId];
		}
	);
}

export function recordSlugsMapStateToProps() {
	const selectorInst = makeSlugSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}

function makeRecordSelector() {
	return createSelector(
		[tableIdSelector, recordIdSelector, recordsSelector],
		(tableId, recordId, records) => {
			return records && tableId && recordId && records[tableId] && records[tableId][recordId];
		}
	);
}

function makeRecordParsedSelector() {
	const recordSelectorInst = makeRecordSelector();
	const schemaSelectorInst = tableSchemaMapStateToProps();

	return createSelector(
		[schemaSelectorInst, recordSelectorInst],
		(table, record) => {
			console.log('parse record');
			const parsedRecord = record && table && table.fields && table.fields.reduce((mounted, field) => {
				mounted[field.name] = record[field.id];
				return mounted;
			}, {});
			return parsedRecord;
		}
	);
}


export function slugWidgetMapStateToProps() {
	const slugSelectorInst = makeSlugSelector();
	const recordSelector = makeRecordParsedSelector();

	return createSelector(
		[slugSelectorInst, recordSelector],
		(slugs, record) => {			
			return {
				slugs,
				record,
			};
		}
	);
}

