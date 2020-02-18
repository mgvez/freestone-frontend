
import { createSelector } from 'reselect';

const recordIdSelector = (state, props) => props.recordId || (props.params && props.params.recordId);
const tableIdSelector = (state, props) => props.tableId || (props.params && props.params.tableId) || (props.table && props.table.id);
const slugsSelector = state => state.freestone.slugs;

function makeSelector() {
	return createSelector(
		[tableIdSelector, recordIdSelector, slugsSelector],
		(tableId, recordId, allSlugs) => {
			// console.log(tableId, recordId, allSlugs);
			return allSlugs[tableId] && allSlugs[tableId][recordId] && allSlugs[tableId][recordId];
		}
	);
}

export function recordSlugsMapStateToProps() {
	const selectorInst = makeSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}

