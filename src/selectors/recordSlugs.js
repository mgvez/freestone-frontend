
import { createSelector } from 'reselect';

const recordIdSelector = (state, props) => props.recordId || (props.params && props.params.recordId);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId) || (props.table && props.table.id);
const realSlugsSelector = state => state.freestone.slugs.slugs;
const langSelector = (state, props) => props.lang;
const workingSlugsSelector = state => state.freestone.slugs.working;
const rewritePatternSelector = state => state.freestone.env.freestone.rewritePattern;
const domainSelector = state => state.freestone.env.freestone.domain;
import { makeRecordParsedSelector } from './record';

function makeSlugSelector(slugsSelector = realSlugsSelector) {
	return createSelector(
		[tableIdSelector, recordIdSelector, slugsSelector],
		(tableId, recordId, allSlugs) => {
			// console.log(tableId, recordId, allSlugs);
			return allSlugs[tableId] && allSlugs[tableId][recordId] && allSlugs[tableId][recordId];
		}
	);
}

export function recordSlugsMapStateToProps() {
	const selectorInst = makeSlugSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}


export function slugWidgetMapStateToProps() {
	const slugSelectorInst = makeSlugSelector(workingSlugsSelector);
	const recordSelector = makeRecordParsedSelector();

	return createSelector(
		[slugSelectorInst, recordSelector, langSelector, rewritePatternSelector, domainSelector],
		(recordWorkingSlugs, record, lang, rewritePatternRaw, domain) => {
			const workingSlugs = recordWorkingSlugs && recordWorkingSlugs[lang];
			// change language in pattern
			const rewritePattern = rewritePatternRaw && rewritePatternRaw.replace(':l', lang);
			return {
				workingSlugs,
				record,
				rewritePattern,
				domain,
			};
		}
	);
}

