import { createSelector } from 'reselect';
import { schemaSelector } from './schema';
//retourne la table du store dont le nom est celui qui est en props.tableName OU tableId du component sur lequel ce selector est pluggé

export const tableNameSelector = (state, props) => props.tableName || (props.params && props.params.tableName) || (props.match && props.match.params && props.match.params.tableName);
const mainTableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId) || (props.match && props.match.params && props.match.params.tableId);
const parentTableIdSelector = (state, props) => props.parentTableId;
const tableSelector = (state, props) => props.table;

function makeSelector(tableIdSelector) {
	return createSelector(
		[schemaSelector, tableSelector, tableNameSelector, tableIdSelector],
		(schema, resolvedTable, tableName, tableId) => {
			//les tablesNames et IDs sont interchangeables. Il se peut donc qu'on aie un ID a la place du nom. À ce moment, il est numerique
			//les tables sont dans le store selon leur ID, mais dans le schema buildé, il y a une entrée par nom de table qui contient le ID (schema[tableName] = id)
			const resolvedTableId = tableId || Number(tableName) || schema.byName[tableName];
			// console.log('process... %s', resolvedTableId);
			const table = resolvedTable || schema.tables[resolvedTableId];
			//retourne une copie de la table, parce que certains reselectors peuvent retourner une copie altérée, par exemple à cause des dependances de champs
			return {
				table,
			};
		}
	);
}

export const tableSchemaSelector = makeSelector(mainTableIdSelector);

export function tableSchemaMapStateToProps() {
	const selectorInst = makeSelector(mainTableIdSelector);
	return (state, props) => {
		return selectorInst(state, props);
	};
}

export function parentTableSchemaMapStateToProps() {
	const selectorInst = makeSelector(parentTableIdSelector);
	return (state, props) => {
		// console.log('reselect table', (props.tableId || (props.params && props.params.tableId)) || props.tableName || (props.params && props.params.tableName));
		return selectorInst(state, props);
	};
}
