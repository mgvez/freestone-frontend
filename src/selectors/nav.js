import { createSelector } from 'reselect';

import { navTreeSelector } from 'selectors/navTree';
const toggleStateSelector = state => state.nav.toggleState;

export const navSelector = createSelector(
	[navTreeSelector, toggleStateSelector],
	(tree, toggleState) => {
		return {
			tree,
			toggleState,
		};
	}
);
