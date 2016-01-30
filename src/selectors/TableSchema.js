import { createSelector } from 'reselect';

//retourne la table du store dont le nom est celui qui est en props.tableName du component sur lequel ce selector est pluggé

const tablesSelector = state => state.schema.tables;
const tableNameSelector = (state, props) => props.params.tableName;

export const tableSchemaSelector = createSelector(
	tablesSelector,
	tableNameSelector,
	(tables, tableName) => tables[tableName],
);
