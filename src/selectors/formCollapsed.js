//SHARED

import { createSelector } from 'reselect';

const tableIdSelector = (state, props) => {
	return props.tableId || (props.table && props.table.id);
};
const collapsedStateSelector = state => state.freestone.subform.collapsedState;

function makeSelector() {
	return createSelector(
		[tableIdSelector, collapsedStateSelector],
		(tableId, collapsedState) => {
			// console.log('process... %s', tableId);
			return {
				isCollapsed: collapsedState[tableId],
			};
		}
	);
}

export function formCollapsedMapStateToProps() {
	const selectorInst = makeSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
