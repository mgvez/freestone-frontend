import { createSelector } from 'reselect';

const stackSelector = state => state.nav.stack;

export const navBackSelector = createSelector(
	[stackSelector],
	(stack) => {
		return {
			backPath: stack[stack.length - 1],
		};
	},
);
