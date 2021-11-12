import { createSelector } from 'reselect';
import { isGodSelector } from './credentials';

const errorsSelector = state => ({
	errors: state.freestone.errors,
});

function makeErrorsSelector() {
	return createSelector(
		[errorsSelector, isGodSelector],
		(errors, isGod) => {
			return {
				...errors,
				...isGod,
			};
		}
	);
}

export function errorsMapStateToProps() {
	const selectorInst = makeErrorsSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
