
import { createSelector } from 'reselect';

const visibleStateSelector = state => state.freestone.fieldgroup.visibleState;
const groupIdSelector = (state, props) => props.id;
const tableIdSelector = (state, props) => props.tableId;

function makeSelector() {
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

export function fieldGroupVisibleMapStateToProps() {
	const selectorInst = makeSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
