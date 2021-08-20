//SHARED
import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { userViewLanguageSelector } from './userViewLanguage';

import { schemaSelector } from './schema';
import { tableSchemaMapStateToProps } from './tableSchema';
import { buildTree, getRecords } from './buildRecord';

/**
 * Manages the selectors for the content block previews. The backend has an endpoint to fetch a content block's html with a json input
 * */

const lastEditSelector = state => state.freestone.recordForm.lastEdit.time;
const previewSlugsSelector = state => state.freestone.preview.slugs;
const previewIdsSelector = state => state.freestone.preview.previewIds;
const currentPreviewIdSelector = state => state.freestone.preview.currentPreview;
const mainPreviewStateSelector = state => state.freestone.preview.mainPreviewState;
const subPreviewModeSelector = state => state.freestone.preview.subPreviewMode;
const contentBlockPreviewSettingsSelector = state => state.freestone.contentBlockPreview.previewSettings;
const previewProcessorTableIdSelector = (state, props) => props.tableId;
const previewProcessorRecordIdSelector = (state, props) => props.recordId;


function makeSelector(slugsSelector) {
	return createSelector(
		[slugsSelector, userViewLanguageSelector, lastEditSelector, previewIdsSelector, previewProcessorTableIdSelector, previewProcessorRecordIdSelector, currentPreviewIdSelector],
		(recordSlugs, userViewLanguage, lastEdit, previewIds, tableId, recordId, currentPreview) => {
			// console.log(recordSlugs);

			const previewRecordId = previewIds[tableId] && previewIds[tableId][recordId];

			const currentLanguage = (userViewLanguage && userViewLanguage.language);
			const slug = recordSlugs && recordSlugs[currentLanguage];
			return {
				slug,
				lastEdit,
				currentLanguage,
				previewRecordId,
				currentPreviewType: currentPreview.type,
			};
		}
	);
}

export function previewRecordMapStateToProps() {
	const selectorInst = makeSelector(recordSlugsMapStateToProps());
	return (state, props) => {
		// console.log(props);
		return selectorInst(state, props);
	};
}

export const currentPreviewSelector = createSelector(
	[currentPreviewIdSelector, previewSlugsSelector, userViewLanguageSelector, mainPreviewStateSelector],
	(currentPreview, allSlugs, userViewLanguage, isPreviewing) => {
		// console.log(currentPreview);
		// console.log(allSlugs);
		// console.log(isPreviewing);
		const { tableId, recordId, type } = currentPreview;
		const recordSlugs = tableId && recordId && allSlugs && allSlugs[tableId] && allSlugs[tableId][recordId];

		const currentLanguage = (userViewLanguage && userViewLanguage.language);
		const currentPreviewSlug = recordSlugs && recordSlugs[currentLanguage];

		return {
			currentPreviewSlug,
			isPreviewing,
			type,
		};
	}
);


const childrenSelector = state => state.freestone.schema.children;
const recordsSelector = state => state.freestone.recordForm.records;
const mtmRecordsSelector = state => state.freestone.recordForm.mtmRecords;
const makeRecordIdSelector = () => (state, props) => props.recordId;
const makeLanguageSelector = () => (state, props) => { return props.lang ? props.lang : state.freestone.env.freestone.defaultLanguage; };

function formatRecords(branch, allRecords, allTables, language) {
	const { tableId, recordId, children } = branch;

	const record = allRecords[tableId] && allRecords[tableId][recordId];
	const table = allTables[tableId];

	if (!table || !record) return null;

	const formattedRecord = table.fields.reduce((built, field) => {
		if (field.language) {
			if (field.language === language) {
				built[field.langAgnosticName] = record[field.id];
			}
		} else {
			built[field.name] = record[field.id];
		}
		return built;
	}, {});
	return {
		record: formattedRecord,
		children: children.reduce((carry, childBranch) => {
			const childTableId = childBranch.tableId;
			const childTable = allTables[childTableId];
			const childTableName = childTable.name;
			return {
				...carry,
				[childTableName]: [
					...(carry[childTableName] || []),
					formatRecords(childBranch, allRecords, allTables, language),
				],
			};
		}, {}),	
	};
}

// for content blocks
export function previewUnsavedRecordMapStateToProps() {
	const tableSchemaSelector = tableSchemaMapStateToProps();
	const recordIdSelector = makeRecordIdSelector();
	const languageSelector = makeLanguageSelector();
	return createSelector(
		[
			tableSchemaSelector,
			schemaSelector,
			recordsSelector,
			mtmRecordsSelector,
			recordIdSelector,
			childrenSelector,
			languageSelector,
			subPreviewModeSelector,
			contentBlockPreviewSettingsSelector,
		],
		(
			table,
			allSchema,
			allRecords,
			allMtmRecords,
			recordId,
			unfilteredChildren,
			language,
			subPreviewModes,
			previewSettings
		) => {
			const { tables } = allSchema;
			// a prop is added by the back on the content block's table to tell that it is previewable. Only the content_block s are configured to do so.
			if (!table.isContentBlockPreviewable) return {};
			const subPreviewMode = subPreviewModes && subPreviewModes[table.id];
			const tree = buildTree(table && table.id, recordId, allRecords, allMtmRecords, tables, unfilteredChildren);
			const records = getRecords(tree, allRecords, false);
			const previewRecord = formatRecords(tree, allRecords, tables, language);
			return {
				previewRecord: JSON.stringify(previewRecord),
				previewSettings,
				records,
				subPreviewMode,
			};
		}
	);
}
