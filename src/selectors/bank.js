
import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
import { BANK_IMG_TABLE, BANK_IMG_CATEG_ALIAS, BANK_FILE_TABLE, BANK_FILE_CATEG_ALIAS } from 'freestone/schemaProps';

const recordsSelector = state => state.recordList;
// const recordListSelector = state => state.imageBankList;
const envSelector = state => state.env;
const bankImgSelector = state => state.bank.images;
const bankFileSelector = state => state.bank.files;
const allUsesSelector = state => state.bank.uses;
const languageSelector = (state, props) => { return props.lang ? props.lang : state.env.defaultLanguage; };

const idSelector = (state, props) => props.id;
const maxSizeSelector = (state, props) => props.maxSize;
const bankNameSelector = (state, props) => props.bankName;

function buildByCategory(records, categFieldAlias) {
	const categs = records && records.reduce((all, record) => {
		if (!~all.indexOf(record[categFieldAlias])) {
			all.push(record[categFieldAlias]);
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
		const categIdx = indexes[record[categFieldAlias]];
		carry[categIdx].images.push(record);
		return carry;
	}, categs);
}

export function bankSelector(bankName) {
	return createSelector(
		[schemaSelector, recordsSelector, languageSelector],
		(schema, stateRecords, lang) => {
			const bankTable = bankName === BANK_IMG_TABLE ? BANK_IMG_TABLE : BANK_FILE_TABLE;
			const bankCategAlias = bankName + '_' + (bankName === BANK_IMG_TABLE ? BANK_IMG_CATEG_ALIAS : BANK_FILE_CATEG_ALIAS);

			const tableId = schema.byName[bankTable];
			const table = schema.tables[tableId];

			const { records: loadedRecords, table: recordsTable, nRecords, search: providedSearch, pageSize, page: providedPage } = stateRecords;
			// console.log(stateRecords);
			const builtRecords = buildByCategory(loadedRecords, bankCategAlias);

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
					lang,
				};
			}
			return {};
		}
	);
}

export const bankImgThumbnailSelector = createSelector(
	[idSelector, maxSizeSelector, bankImgSelector, languageSelector],
	(id, maxSize, allImages, lang) => {
		// console.log(allImages);
		const markup = allImages[`${id}_${maxSize}`];
		return {
			markup,
			lang,
		};
	}
);

export const bankFileItemSelector = createSelector(
	[idSelector, bankFileSelector, languageSelector],
	(id, allFiles, lang) => {
		// console.log(allImages);
		const item = allFiles[id];
		return {
			item,
			lang,
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
