
import { createSelector } from 'reselect';

const recordIdSelector = (state, props) => props.recordId || (props.params && props.params.recordId);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId) || (props.table && props.table.id);
const langSelector = (state, props) => props.lang;
const titlesSelector = state => state.freestone.metadata.titles;
const structuredSelector = state => state.freestone.metadata.structured;
import { makeRecordParsedSelector } from './record';

function makeMetaSelector(metaRawSelector) {
	return createSelector(
		[tableIdSelector, recordIdSelector, metaRawSelector],
		(tableId, recordId, allMetas) => {
			// console.log(tableId, recordId, allSlugs);
			return allMetas[tableId] && allMetas[tableId][recordId] && allMetas[tableId][recordId];
		}
	);
}


export function titlesWidgetMapStateToProps() {
	const titlesSelectorInst = makeMetaSelector(titlesSelector);
	const recordSelector = makeRecordParsedSelector();

	return createSelector(
		[titlesSelectorInst, recordSelector, langSelector],
		(recordWorkingTitles, record, lang) => {
			const workingTitle = recordWorkingTitles && recordWorkingTitles[lang];
			return {
				workingTitle,
				record,
			};
		}
	);
}

export function structuredWidgetMapStateToProps() {
	const titlesSelectorInst = makeMetaSelector(structuredSelector);
	const recordSelector = makeRecordParsedSelector();

	return createSelector(
		[titlesSelectorInst, recordSelector, langSelector],
		(recordWorkingStructured, record, lang) => {
			const workingStructured = recordWorkingStructured && recordWorkingStructured[lang];
			return {
				workingStructured,
				record,
			};
		}
	);
}

