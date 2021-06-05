
import { createSelector } from 'reselect';

const recordIdSelector = (state, props) => props.recordId || (props.params && props.params.recordId);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId) || (props.table && props.table.id);
const langSelector = (state, props) => props.lang;
const titlesSelector = state => state.freestone.titles;
import { makeRecordParsedSelector } from './record';

function makeTitleSelector(titlesRawSelector) {
	return createSelector(
		[tableIdSelector, recordIdSelector, titlesRawSelector],
		(tableId, recordId, allTitles) => {
			// console.log(tableId, recordId, allSlugs);
			return allTitles[tableId] && allTitles[tableId][recordId] && allTitles[tableId][recordId];
		}
	);
}


export function titlesWidgetMapStateToProps() {
	const titlesSelectorInst = makeTitleSelector(titlesSelector);
	const recordSelector = makeRecordParsedSelector();

	return createSelector(
		[titlesSelectorInst, recordSelector, langSelector],
		(recordWorkingTitles, record, lang) => {
			console.log(recordWorkingTitles);
			const workingTitle = recordWorkingTitles && recordWorkingTitles[lang];
			return {
				workingTitle,
				record,
			};
		}
	);
}

