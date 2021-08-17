import { createSelector } from 'reselect';
import { schemaSelector } from './schema';
import { routeSelector } from './route';


import { TYPES_PARENT_LINK, TYPE_PRIMARY, TYPE_ORDER, TYPE_ISPUBLISHED, TYPE_LANGUAGE } from '../freestone/schemaProps';
const INDEPENDENT_FIELD_TYPES = [TYPE_PRIMARY, TYPE_ORDER, TYPE_ISPUBLISHED, TYPE_LANGUAGE];

const allDependenciesSelector = state => state.freestone.blockFieldDeps.dependencies;
const configSelector = state => (state.freestone.blockFieldDeps.config || {});

const transformedSchemaSelector = createSelector(
	[configSelector, schemaSelector],
	(config, allSchema) => {
		if (!config || !allSchema) return null;
		const table = config.tableId && allSchema.tables && allSchema.tables[config.tableId];
		if (!table) return null;

		const children = (config.subforms || []).map(subform => {
			const childTable = subform.tableId && allSchema.tables && allSchema.tables[subform.tableId];
			return {
				id: subform.tableId,
				schema: childTable,
			};
		});

		const parseTable = (tableSchema, tableName) => {
			// console.log(tableSchema);
			return tableSchema && Object.values(tableSchema.fields.map(field => {
				if (field.foreign && ~TYPES_PARENT_LINK.indexOf(field.foreign.foreignType)) return null;
				if (~INDEPENDENT_FIELD_TYPES.indexOf(field.type)) return null;
				if (field.name === config.controlFieldName) return null;
				return {
					...field,
					displayLabel: field.langAgnosticName,
					tableName,
				};
			}).filter(f => f).reduce((carry, field) => {
				const { langAgnosticName } = field;
				carry[langAgnosticName] = field;
				return carry;
			}, {}));
		};

		const dependingFields = [
			...parseTable(table),

			// also add subform link fields
			...(config.subforms || []).map(subform => {
				const displayLabel = `Subform: ${subform.tableName}`;
				return {
					...subform.linkField,
					displayLabel,
					childrenFields: parseTable(children.find(ct => ct.id === subform.tableId).schema, subform.tableName),
				};
			}),
		];

		return {
			...table,
			children,
			dependingFields,
		};
	}
);

const dependenciesSelector = createSelector(
	[allDependenciesSelector],
	(dependencies) => {
		if (!dependencies) return {};
		console.log(dependencies);
		const dependenciesByField = dependencies && dependencies.reduce((carry, dependency) => {
			const { dependingFieldId, rule } = dependency;
			carry[dependingFieldId] = carry[dependingFieldId] || {};
			carry[dependingFieldId][rule] = dependency;
			return carry;
		}, {});

		return {
			dependencies,
			dependenciesByField,
		};
	}
);


export const blockFieldDepsSelector = createSelector(
	[configSelector, transformedSchemaSelector, allDependenciesSelector, routeSelector],
	(config, table, dependencies, route) => {

		// console.log(dependencies);
		// console.log(config);
		const dependenciesByField = dependencies && dependencies.reduce(
			(carry, dependency) => {
				const { dependingFieldId, rule, isDisplay } = dependency;
				carry[dependingFieldId] = carry[dependingFieldId] || {};
				carry[dependingFieldId][rule] = dependency;
				return carry;
			}, 
			{}
		);
		const dependenciesByFieldFiltered = dependenciesByField && Object.entries(dependenciesByField).reduce((carry, [id, vals]) => {
			// if all dependencies are set to false, remove all values
			const hasDisplay = Object.values(vals).find(v => v.isDisplay);
			if (hasDisplay) {
				carry[id] = Object.values(config.types).reduce((parsedVals, { id: typeId }) => {
					if (!parsedVals[typeId]) {
						parsedVals[typeId] = { isDisplay: false };
					}
					return parsedVals;
				}, vals);
			}
			return carry;
		}, {});
		// console.log(dependenciesByFieldFiltered);

		return {
			dependencies,
			dependenciesByField: dependenciesByFieldFiltered,
			...config,
			table,
			...route,
		};
	}
);
