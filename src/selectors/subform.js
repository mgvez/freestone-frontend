
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';


const tableIdSelector = (state, props) => { 
	return props.tableId || (props.table && props.table.id);
};
const collapsedStateSelector = state => state.freestone.subform.collapsedState;
const viewStateSelector = state => state.freestone.subform.viewState;

export const subformViewSelector = createSelector(
	[tableIdSelector, viewStateSelector],
	(tableId, viewState) => {
		return {
			currentViewType: viewState[tableId],
		};
	}
);


function makeIsCollapsedSelector() {
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

function formCollapsedMapStateToProps() {
	const selectorInst = makeIsCollapsedSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}


function makeSubformSelector(tableSchemaSelector, formCollapsedSelector) {
	return createSelector(
		[tableSchemaSelector, formCollapsedSelector],
		(schema, formCollapsed) => {
			return {
				...schema,
				...formCollapsed,
			};
		}
	);
}

export function subformMapStateToProps() {
	const selectorInst = makeSubformSelector(tableSchemaMapStateToProps(), formCollapsedMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}
