
import { createSelector } from 'reselect';

const collapsedStateSelector = state => state.freestone.fieldgroup.collapsedState;
const groupIdSelector = (state, props) => props.id;

function makeSelector() {
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

export function fieldGroupCollapsedMapStateToProps() {
	const selectorInst = makeSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
