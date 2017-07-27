
import { createSelector } from 'reselect';

const tableIdSelector = (state, props) => { 
	return props.tableId || (props.table && props.table.id);
};
const viewStateSelector = state => state.freestone.subform.viewState;


export const subformViewSelector = createSelector(
	[tableIdSelector, viewStateSelector],
	(tableId, viewState) => {
		return {
			currentViewType: viewState[tableId],
		};
	}
);
