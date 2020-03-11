
import { createSelector } from 'reselect';


const visibleStateSelector = state => state.freestone && state.freestone.fieldgroup.visibleState;
const collapsedStateSelector = state => state.freestone && state.freestone.fieldgroup.collapsedState;

const groupIdSelector = (state, props) => props.id;
const tableIdSelector = (state, props) => props.tableId;

function makeVisbleSelector() {
	return createSelector(
		[groupIdSelector, tableIdSelector, visibleStateSelector],
		(groupId, tableId, visibleState) => {
			// console.log(groupId, tableId);
			
			return {
				isVisible: visibleState[tableId] === groupId,
			};
		}
	);
}

function makeCollapseSelector() {
	return createSelector(
		[groupIdSelector, collapsedStateSelector],
		(groupId, collapsedState) => {
			// console.log('process... %s', tableId);
			return {
				isCollapsed: collapsedState[groupId],
			};
		}
	);
}

export function fieldGroupsMapStateToProps() {
	const visibleSelector = makeVisbleSelector();
	const collapseSelector = makeCollapseSelector();

	return () => {
		return { ...visibleSelector, ...collapseSelector };
	};
}
