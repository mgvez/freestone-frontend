
import { createSelector } from 'reselect';
import { genericTableIdSelector } from './tableSchema';


const visibleStateSelector = state => state.freestone && state.freestone.fieldgroup.visibleState;
const collapsedStateSelector = state => state.freestone && state.freestone.fieldgroup.collapsedState;

const groupIdSelector = (state, props) => props.id;

function makeVisbleSelector() {
	return createSelector(
		[groupIdSelector, genericTableIdSelector, visibleStateSelector],
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
