
import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
import { BANK_IMG_TABLE, BANK_IMG_CATEG_ALIAS } from 'freestone/schemaProps';

const recordsSelector = state => state.recordList;
// const recordListSelector = state => state.imageBankList;
const envSelector = state => state.env;
const bankImgSelector = state => state.bankImage;
const allUsesSelector = state => state.bankUses;

const idSelector = (state, props) => props.id;
const bankNameSelector = (state, props) => props.bankName;

function buildByCategory(records) {
	const categs = records && records.reduce((all, record) => {
		if (!~all.indexOf(record[BANK_IMG_CATEG_ALIAS])) {
			all.push(record[BANK_IMG_CATEG_ALIAS]);
		}
		return all;
	}, []).map(categName => {
		return {
			categName,
			images: [],
		};
	});
	const indexes = categs.reduce((carry, categ, idx) => {
		carry[categ.categName] = idx;
		return carry;
	}, {});
	// console.log(categs);

	return records.reduce((carry, record) => {
		const categIdx = indexes[record[BANK_IMG_CATEG_ALIAS]];
		carry[categIdx].images.push(record);
		return carry;
	}, categs);
}

export const bankSelector = createSelector(
	[schemaSelector, recordsSelector, envSelector],
	(schema, stateRecords, env) => {

		const tableId = schema.byName[BANK_IMG_TABLE];
		const table = schema.tables[tableId];

		const { records: loadedRecords, table: recordsTable, nRecords, search: providedSearch, pageSize, page: providedPage } = stateRecords;
		// console.log(stateRecords);
		const builtRecords = buildByCategory(loadedRecords);

		if (table && recordsTable === table.name) {

			const nPages = Math.ceil(nRecords / pageSize);

			return {
				records: builtRecords,
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
