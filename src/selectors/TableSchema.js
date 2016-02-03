import { createSelector } from 'reselect';

//retourne la table du store dont le nom est celui qui est en props.tableName OU tableId du component sur lequel ce selector est pluggé

const tablesSelector = state => state.schema.tables;
const tableNameSelector = (state, props) => props.tableName || (props.params && props.params.tableName);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId);

export const tableSchemaSelector = createSelector(
	[tablesSelector, tableNameSelector, tableIdSelector],
	(tables, tableName, tableId) => {
		//les tables sont dans le store selon leur ID
		console.log(`select table ${tableId} / ${tableName}`);
		let table;
		if (tableId) {
			table = tables[tableId];
		} else if (tableName) {
			table = Object.keys(tables).reduce((found, id) => {
				const cur = tables[id];
				return found || (cur.name === tableName && cur);
			}, null);
		}
		return {
			table,
		};
	}
);
