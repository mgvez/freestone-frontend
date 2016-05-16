//SHARED

import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
//retourne la table du store dont le nom est celui qui est en props.tableName OU tableId du component sur lequel ce selector est pluggé

const tableNameSelector = (state, props) => props.tableName || (props.params && props.params.tableName);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId);

export const tableSchemaSelector = createSelector(
	[schemaSelector, tableNameSelector, tableIdSelector],
	(schema, tableName, tableId) => {
		//les tables sont dans le store selon leur ID, mais dans le schema buildé, il y a une entrée par nom de table qui contient le ID (schema[tableName] = id)
		// console.log(`select table ${tableId} / ${tableName}`);
		const resolvedTableId = tableId || schema.byName[tableName];
		console.log(`%cselect`, 'font-weight:bold;color:#994444;', `table ${resolvedTableId}`);

		return {
			table: schema.tables[resolvedTableId],
		};
	}
);


function makeTableSchemaSelector() {
	return createSelector(
		[schemaSelector, tableNameSelector, tableIdSelector],
		(schema, tableName, tableId) => {
			//les tables sont dans le store selon leur ID, mais dans le schema buildé, il y a une entrée par nom de table qui contient le ID (schema[tableName] = id)
			// console.log(`select table ${tableId} / ${tableName}`);
			const resolvedTableId = tableId || schema.byName[tableName];
			console.log(`%cshared`, 'font-weight:bold;color:#449944;', `select table ${resolvedTableId}`);

			return {
				table: schema.tables[resolvedTableId] || { name: `fakeTable-${resolvedTableId}` },
			};
		}
	);
}

export const makeMapStateToProps = () => {
	const tableSchemaSelectorInst = makeTableSchemaSelector();
	return (state, props) => {
		console.log('reselect', props.params.tableId);
		return tableSchemaSelectorInst(state, props);
	};
};
