
import { createSelector } from 'reselect';
import { isGodSelector } from './credentials';

function makeEditSchemaSelector() {
	return createSelector(
		[isGodSelector],
		(isGod) => {
			return {
				...isGod,
			};
		}
	);
}

export function editSchemaMapStateToProps() {
	const selectorInst = makeEditSchemaSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
