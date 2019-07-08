
import { createSelector } from 'reselect';

const collapsedStateSelector = state => state.freestone.fieldgroup.collapsedState;
const groupIdSelector = (state, props) => props.id;
const tableIdSelector = (state, props) => props.tableId;

function makeSelector() {
	return createSelector(
		[groupIdSelector, tableIdSelector, collapsedStateSelector],
		(groupId, tableId, collapsedState) => {
			// console.log(groupId, tableId);
			
			return {
				isCollapsed: collapsedState[tableId] !== groupId,
			};
		}
	);
}

export function fieldGroupCollapsedMapStateToProps() {
	const selectorInst = makeSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
