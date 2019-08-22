//SHARED

import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';
import { tableRecordsMapStateToProps } from './record';
import { subformViewSelector } from './subform';
import { schemaSelector } from './schema';
import { isNew } from '../utils/UniqueId';
import { getForeignFieldId } from '../freestone/schemaHelpers';
import { userViewLanguageSelector } from './userViewLanguage';

import { PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS } from '../freestone/schemaProps';
import { MAX_TAB_LABEL_LENGTH } from '../freestone/settings';

const childrenAreLoadedSelector = state => state.freestone.recordForm.childrenAreLoaded;
const shownRecordsSelector = (state) => state.freestone.recordForm.shownRecords;

const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;
const rawForeignOptionsSelector = state => state.freestone.foreign.options;


function getRecordsFromParent(records, parentRecordId, linkFieldId) {
	return Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return (record[linkFieldId] === parentRecordId && record[DELETED_PSEUDOFIELD_ALIAS] !== true) && record;
	}).filter(record => record);
}

function sortRecords(records, orderField) {
	if (orderField) {
		return records.sort((a, b) => {
			return a[orderField.id] - b[orderField.id];
		});
	}
	return records;
}

function filterLangRecords(records, languageField, currentLanguage) {
	// console.log(records, languageField, currentLanguage);
	if (!languageField) return records;
	const langFieldId = languageField.id;
	return records && records.filter(r => r[langFieldId] === currentLanguage);
}

function getLabeledRecords(records, searchableFields, orderField, rawForeignOptions) {

	// console.log(rawForeignOptions);
	// console.log(searchableFields);
	return sortRecords(records, orderField).map(record => {
		// console.log(record);
		let label = searchableFields.map(field => {
			const fieldVal = record[field.id];
			//si valeur foreign, trouve parmi les options foreign. Ne les load pas spécifiquement, les ajoute uniquement si elles sont loadées pour ce field (par le autocomplete du field)
			if (field.foreign) {
				if (rawForeignOptions[field.id] && rawForeignOptions[field.id].options) {
					const selectedOption = rawForeignOptions[field.id].options.find(opt => opt.value === fieldVal);
					if (!selectedOption) {
						return '';
					}
					return Object.keys(selectedOption.row).reduce((foreignLabel, curAlias) => {
						return foreignLabel.replace(`{${curAlias}}`, selectedOption.row[curAlias]);
					}, rawForeignOptions[field.id].display.label);
				}
				return '';
			}
			return fieldVal;
		}).join(' ');

		if (label.length > MAX_TAB_LABEL_LENGTH) {
			label = label.substring(0, MAX_TAB_LABEL_LENGTH) + '...';
		}

		return {
			id: record[PRIKEY_ALIAS],
			order: orderField && record[orderField.id],
			label,
		};
	});
}

function makeSelector(tableSchemaSelector, tableRecordsSelector) {
	return createSelector(
		[tableSchemaSelector, schemaSelector, tableRecordsSelector, childrenAreLoadedSelector, parentRecordIdSelector, parentTableIdSelector, shownRecordsSelector, subformViewSelector, rawForeignOptionsSelector, userViewLanguageSelector],
		(schema, allSchema, tableRecords, childrenAreLoaded, parentRecordId, parentTableId, shownRecords, subformView, rawForeignOptions, userViewLanguage) => {
			const { table } = schema;
			const { tables } = allSchema;

			if (table) {
				const areLoaded = parentRecordId && childrenAreLoaded[parentTableId] && childrenAreLoaded[parentTableId][parentRecordId] && childrenAreLoaded[parentTableId][parentRecordId][table.id];
				const parentLinkField = table.parentLink[parentTableId];

				const type = parentLinkField && parentLinkField.foreign.foreignType;
				const defaultViewType = parentLinkField && parentLinkField.foreign.defaultView;
				
				let activeRecordId;
				let activeRecord;

				let childrenRecords;
				if (areLoaded || isNew(parentRecordId)) {
					const subformFieldId = getForeignFieldId(table.id, parentTableId, tables);
					// console.log(subformFieldId);
					// console.log(tableRecords);
					childrenRecords = tableRecords ? getRecordsFromParent(tableRecords, parentRecordId, subformFieldId) : [];

					//if table has language field, only show children that are the current
					childrenRecords = filterLangRecords(childrenRecords, table.languageField, userViewLanguage.language);
					
					// console.log(childrenRecords);
					childrenRecords = getLabeledRecords(childrenRecords, table.searchableFields, table.orderField, rawForeignOptions);
					
					activeRecordId = shownRecords && shownRecords[table.id] && (shownRecords[table.id][parentRecordId] || null);

					//if record is part of a subform with a language field (so that you have french records and english records)
					if (activeRecordId && typeof activeRecordId === 'object') activeRecordId = activeRecordId[userViewLanguage.language];

					// if we specifically require not to see an active record, for example in stacked list
					if (activeRecordId !== -1) {
						activeRecord = childrenRecords && (childrenRecords.find(rec => rec.id === activeRecordId) || childrenRecords[childrenRecords.length - 1]);
					}
				}

				//highest order, pour quand on add un record, qu'il soit à la suite
				let highestOrder = 0;
				if (table.orderField && childrenRecords) {
					highestOrder = childrenRecords.reduce((highest, record) => {
						return record.order > highest ? Number(record.order) : highest;
					}, 0);
				}

				return {
					table,
					highestOrder,
					type,
					defaultViewType,
					childrenRecords,
					activeRecord,
					...subformView,
				};
			}

			return {};

		}
	);
}

export function formChildrenRecordsMapStateToProps() {
	const selectorInst = makeSelector(tableSchemaMapStateToProps(), tableRecordsMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}
