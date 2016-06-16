
import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
import { BANK_IMG_TABLE } from 'freestone/schemaProps';

const recordListSelector = state => state.imageBankList;


export const bankSelector = createSelector(
	[schemaSelector, recordListSelector],
	(schema, recordList) => {

		const tableId = schema.byName[BANK_IMG_TABLE];
		const table = schema.tables[tableId];

		return {
			...recordList,
			table,
		};
	}
);
