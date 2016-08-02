
import { createSelector } from 'reselect';
import { formCollapsedMapStateToProps } from 'selectors/formCollapsed';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';

function makeSelector(tableSchemaSelector, formCollapsedSelector) {
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
	const selectorInst = makeSelector(tableSchemaMapStateToProps(), formCollapsedMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}
