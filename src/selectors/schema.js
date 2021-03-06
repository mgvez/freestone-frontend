import { createSelector } from 'reselect';
import { TYPE_MTM, TYPES_PARENT_LINK, TYPE_PRIMARY, TYPE_ORDER, TYPE_LANGUAGE } from '../freestone/schemaProps';

//build le schema complet en tree

const tablesSelector = state => state.freestone.schema.tables;
const fieldsSelector = state => state.freestone.schema.fields;
const fieldDependenciesSelector = state => state.freestone.schema.fieldDependencies;
const childrenSelector = state => state.freestone.schema.children;


export const schemaSelector = createSelector(
	[tablesSelector, fieldsSelector, fieldDependenciesSelector, childrenSelector],
	(rawTables, fields, fieldDependencies, allChildren) => {
		// console.log('%cBUILD SCHEMA ======', 'font-weight:bold;color:#44ff44;');

		let tables = Object.keys(rawTables).reduce((carry, tableId) => {
			const table = rawTables[tableId];
			carry[tableId] = {
				...table,
				fields: [],
				searchableFields: [],
				quickEditableFields: [],
				labelFields: [],
				fieldDependencies: {},
				prikey: null,
				parentLink: {},
				groupField: null,
				isSelfTree: false,
				hasOrder: false,
				orderField: null,
				hasLanguage: false,
				languageField: null,
				mtmOptionField: null,
				hasChildren: !!(allChildren[tableId] && allChildren[tableId].length),
			};
			carry[table.name] = tableId;
			return carry;
		}, {});

		const byName = Object.keys(rawTables).reduce((carry, tableId) => {
			const table = rawTables[tableId];
			carry[table.name] = tableId;
			return carry;
		}, {});

		tables = Object.keys(fields).reduce((carry, fieldId) => {

			const field = fields[fieldId];
			// console.log(field);
			
			const { table_id } = field;
			const table = carry[table_id];
			if (field.isPermitted) table.fields.push(field);

			if (fieldDependencies[fieldId]) {
				table.fieldDependencies[fieldId] = fieldDependencies[fieldId];
			}

			if (field.isSearch) {
				// console.log(field);
				if (field.isGroup) {
					table.groupField = field;
					//self join? si oui, affiche le tree
					if (field.foreign && table_id === field.foreign.foreignTableId) {
						table.isSelfTree = true;
					}
				} else {
					//search fields have to be permitted, as they potentially are editable from the list (booleans, order...)
					if (field.isPermitted) table.searchableFields.push(field);
				}

				//label fields don't depend on permissions. Their purpose is to identify the record. Group fields may be part of the label
				table.labelFields.push(field);

			}

			if (field.isQuickEditable) {
				table.quickEditableFields.push(field);
			}

			if (field.type === TYPE_ORDER) {
				table.hasOrder = true;
				table.orderField = field;
			}

			if (field.type === TYPE_ORDER) {
				table.hasOrder = true;
				table.orderField = field;
			}

			if (field.type === TYPE_LANGUAGE) {
				table.hasLanguage = true;
				table.languageField = field;
				// console.log(field);
			}

			if (field.type === TYPE_PRIMARY) table.prikey = field;
			if (field.foreign && ~TYPES_PARENT_LINK.indexOf(field.foreign.foreignType)) {
				// console.log(field.foreign.freeforeigns);
				// if it has a free foreign, this field contains links to as many tables as there are free foreigns defined for it
				if (field.foreign.freeforeigns) {
					table.parentLink = field.foreign.freeforeigns.reduce((accumulator, current) => {
						// console.log(current);
						accumulator[current.foreignTableId] = field;
						return accumulator;
					}, table.parentLink);
				} else if (field.foreign.foreignTableId) {
					table.parentLink[field.foreign.foreignTableId] = field;
				}
			}
			return carry;
		}, tables);
		// console.log(tables);


		Object.keys(tables).forEach((tableId) => {
			const table = tables[tableId];

			if (table.fields) table.fields = table.fields.sort((a, b) => a.rank - b.rank);
			if (table.searchableFields) table.searchableFields = table.searchableFields.sort((a, b) => a.rank - b.rank);
			if (table.quickEditableFields) table.quickEditableFields = table.quickEditableFields.sort((a, b) => a.rank - b.rank);

			//if table has many to many field, we need to find the option field
			if (table.type === TYPE_MTM) {
				table.mtmOptionField = table.fields.reduce((carry, field) => {
					if (!carry && !~TYPES_PARENT_LINK.indexOf(field.type) && field.foreign) {
						return field;
					}
					return carry;
				}, null);
			}
			// 

		});

		// console.log(tables);
		return {
			tables,
			byName,
		};
	}
);
