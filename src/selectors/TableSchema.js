import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
//retourne la table du store dont le nom est celui qui est en props.tableName OU tableId du component sur lequel ce selector est pluggé

const tableNameSelector = (state, props) => props.tableName || (props.params && props.params.tableName);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId);


function makeSelector(isShared) {
	return createSelector(
		[schemaSelector, tableNameSelector, tableIdSelector],
		(schema, tableName, tableId) => {
			//les tables sont dans le store selon leur ID, mais dans le schema buildé, il y a une entrée par nom de table qui contient le ID (schema[tableName] = id)
			const resolvedTableId = tableId || schema.byName[tableName];
			// console.log((isShared ? `%cprivate` : '%cpublic'), 'font-weight:bold;color:' + (isShared ? '#449944;' : '#994444'), `select table ${resolvedTableId}`);

			const table = schema.tables[resolvedTableId];
			//retourne une copie de la table, parce que certains reselectors peuvent retourner une copie altérée, par exemple à cause des dependances de champs
			return {
				table: {
					...table,
					fields: [
						...table.fields,
					],
				},
			};
		}
	);
}

export const tableSchemaSelector = makeSelector();

export function tableSchemaMapStateToProps() {
	const selectorInst = makeSelector(true);
	return (state, props) => {
		// console.log('reselect table', (props.tableId || (props.params && props.params.tableId)) || props.tableName || (props.params && props.params.tableName));
		return selectorInst(state, props);
	};
}
