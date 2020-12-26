import { createSelector } from 'reselect';
import { schemaSelector } from './schema';
import { TYPES_PARENT_LINK, TYPE_PRIMARY, TYPE_ORDER, TYPE_ISPUBLISHED, TYPE_LANGUAGE } from '../freestone/schemaProps';
const INDEPENDENT_FIELD_TYPES = [TYPE_PRIMARY, TYPE_ORDER, TYPE_ISPUBLISHED, TYPE_LANGUAGE];

const allDependenciesSelector = state => state.freestone.blockFieldDeps.dependencies;
const configSelector = state => state.freestone.blockFieldDeps.config;

const transformedSchemaSelector = createSelector(
	[configSelector, schemaSelector],
	(config, allSchema) => {
		if (!config || !allSchema) return null;
		const table = config.tableId && allSchema.tables && allSchema.tables[config.tableId];
		if (!table) return null;

		const dependingFields = Object.values(table.fields.map(field => {
			if (field.foreign && ~TYPES_PARENT_LINK.indexOf(field.foreign.foreignType)) return null;
			if (~INDEPENDENT_FIELD_TYPES.indexOf(field.type)) return null;
			if (field.name === config.controlFieldName) return null;
			return field;
		}).filter(f => f).reduce((carry, field) => {
			const { langAgnosticName } = field;
			carry[langAgnosticName] = field;
			return carry;
		}, {}));
		return {
			...table,
			dependingFields,
		};
	}
);

const suggestionsSelector = createSelector(
	[configSelector, schemaSelector],
	(config, allSchema) => {
		if (!config || !allSchema) return null;
		const table = config.tableId && allSchema.tables && allSchema.tables[config.tableId];
		if (!table) return null;
		const { templates } = config;
		const suggestionsByTypeId = templates.reduce((carry, template) => {
			carry[template.id] = template.placedItems.fields && template.placedItems.fields.map(fieldName => {
				const field = table.fields.find(f => f.name === fieldName);
				return field && field.id;
			}).filter(f => f);
			return carry;
		}, {});
		return suggestionsByTypeId;
	}
);
const dependenciesSelector = createSelector(
	[allDependenciesSelector, suggestionsSelector],
	(dependencies, suggestions) => {
		if (!dependencies || !suggestions) return null;
		const parsed = dependencies.map(dependency => {
			const { dependingFieldId, rule } = dependency;
			let isSuggested = false;
			if (suggestions[rule]) {
				isSuggested = suggestions[rule].find(placed => placed === dependingFieldId) && true;
				// if (isSuggested) console.log('SUGGESTED', rule, suggestions[rule]);
			}
			// if (isSuggested) console.log(dependency);
			return {
				...dependency,
				isSuggested,
			};
		});
		// console.log(parsed);
		const dependenciesByField = parsed && parsed.reduce((carry, dependency) => {
			const { dependingFieldId, rule } = dependency;
			carry[dependingFieldId] = carry[dependingFieldId] || {};
			carry[dependingFieldId][rule] = dependency;
			return carry;
		}, {});

		return {
			dependencies: parsed,
			dependenciesByField,
		};
	}
);


export const blockFieldDepsSelector = createSelector(
	[configSelector, transformedSchemaSelector, dependenciesSelector],
	(config, table, dependencies) => {
		

		return {
			...dependencies,
			...config,
			table,
		};
	}
);
