
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';


const tableIdSelector = (state, props) => { 
	return props.tableId || (props.table && props.table.id);
};
const visibleStateSelector = state => state.freestone.subform.visibleState;
const viewStateSelector = state => state.freestone.subform.viewState;

export const subformViewSelector = createSelector(
	[tableIdSelector, viewStateSelector],
	(tableId, viewState) => {
		return {
			currentViewType: viewState[tableId],
		};
	}
);


function makeIsVisibleSelector() {
	return createSelector(
		[tableIdSelector, visibleStateSelector],
		(tableId, visibleState) => {
			// console.log('process... %s', tableId);
			return {
				isVisible: visibleState[tableId],
			};
		}
	);
}

function formVisibleMapStateToProps() {
	const selectorInst = makeIsVisibleSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}


function makeSubformSelector(tableSchemaSelector, formVisibleSelector) {
	return createSelector(
		[tableSchemaSelector, formVisibleSelector],
		(schema, formVisible) => {
			return {
				...schema,
				...formVisible,
			};
		}
	);
}

export function subformMapStateToProps() {
	const selectorInst = makeSubformSelector(tableSchemaMapStateToProps(), formVisibleMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}
