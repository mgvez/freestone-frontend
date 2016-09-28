
import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
import { BANK_IMG_TABLE } from 'freestone/schemaProps';

const recordsSelector = state => state.recordList;
// const recordListSelector = state => state.imageBankList;
const envSelector = state => state.env;
const bankImgSelector = state => state.bankImage;
const allUsesSelector = state => state.bankUses;

const idSelector = (state, props) => props.id;
const bankNameSelector = (state, props) => props.bankName;

export const bankSelector = createSelector(
	[schemaSelector, recordsSelector, envSelector],
	(schema, stateRecords, env) => {

		const tableId = schema.byName[BANK_IMG_TABLE];
		const table = schema.tables[tableId];

		const { records: loadedRecords, table: recordsTable, nRecords, search: providedSearch, pageSize, page: providedPage } = stateRecords;
		// console.log(stateRecords);

		if (table && recordsTable === table.name) {

			const nPages = Math.ceil(nRecords / pageSize);

			return {
				records: loadedRecords,
				table,
				pageSize,
				providedPage,
				nRecords,
				providedSearch,
				curPage: providedPage,
				nPages,
			};
		}

		return {};
	}
);


export const bankImgThumbnailSelector = createSelector(
	[idSelector, bankImgSelector],
	(id, allImages) => {
		// console.log(allImages);
		const markup = allImages[id];
		return {
			markup,
		};
	}
);

export const bankUsesSelector = createSelector(
	[bankNameSelector, idSelector, allUsesSelector],
	(bankName, id, allUses) => {
		// console.log(bankName);
		// console.log(allUses);
		const records = allUses[bankName] && allUses[bankName][id];
		return {
			records,
		};
	}
);
