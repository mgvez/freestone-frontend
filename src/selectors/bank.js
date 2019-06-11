
import { createSelector } from 'reselect';
import { schemaSelector } from './schema';
import { BANK_IMG_TABLE, BANK_IMG_CATEG_ALIAS, BANK_DOCS_TABLE, BANK_CATEG_ALIAS } from '../freestone/SchemaProps';
import { THUMBNAIL_SIZE } from '../freestone/settings';
import { routeSelector } from './route';


const recordsSelector = state => state.freestone.recordList;
// const recordListSelector = state => state.freestone.imageBankList;
const bankImgSelector = state => state.freestone.bank.images;
const bankFileSelector = state => state.freestone.bank.files;
const allUsesSelector = state => state.freestone.bank.uses;
const selectionSelector = state => state.freestone.bank.selection;
const allBankCategoriesSelector = state => state.freestone.bank.categories;
const languageSelector = (state, props) => { return props.lang ? props.lang : state.freestone.env.freestone.defaultLanguage; };
const recordsFormSelector = state => state.freestone.recordForm.records;

const idSelector = (state, props) => props.id;
const maxSizeSelector = (state, props) => props.maxSize || THUMBNAIL_SIZE;
const bankNameSelector = (state, props) => props.bankName;


export const bankCategoriesSelector = createSelector(
	[bankNameSelector, allBankCategoriesSelector],
	(bankName, allCategories) => {
		// console.log(allImages);
		const categories = allCategories && allCategories[bankName];
		return {
			categories,
		};
	}
);

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
			const bankTable = bankName === BANK_IMG_TABLE ? BANK_IMG_TABLE : BANK_DOCS_TABLE;
			const bankCategAlias = bankName + '_' + (bankName === BANK_IMG_TABLE ? BANK_IMG_CATEG_ALIAS : BANK_CATEG_ALIAS);

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

export const bankSelectionSelector = createSelector(
	[selectionSelector, routeSelector, recordsFormSelector],
	(selection, route, records) => {
		// console.log(selection);
		const { destination, bankRecord } = selection;
		// console.log(table);

		//find value of target field, where we want to put the value of the bank item
		let targetFieldValue;
		if (destination) {
			const { tableId, fieldId, recordId } = destination;
			targetFieldValue = records[tableId] && records[tableId][recordId] && records[tableId][recordId][fieldId];
		}

		return {
			isChoosingBankItem: !!selection.destination,
			gotoOnChoose: destination && destination.returnTo,
			bankDestination: destination,
			bankRecord,
			targetFieldValue,
			route: route.path,
		};
	}
);
