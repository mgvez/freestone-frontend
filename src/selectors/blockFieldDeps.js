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


export const blockFieldDepsSelector = createSelector(
	[allDependenciesSelector, configSelector, transformedSchemaSelector],
	(dependencies, config, table) => {
		const dependenciesByField = dependencies && dependencies.reduce((carry, dependency) => {
			const { dependingFieldId, rule } = dependency;
			carry[dependingFieldId] = carry[dependingFieldId] || {};
			carry[dependingFieldId][rule] = dependency;
			return carry;
		}, {});

		return {
			dependencies,
			dependenciesByField,
			...config,
			table,
		};
	}
);
