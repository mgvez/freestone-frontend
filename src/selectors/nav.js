import { createSelector } from 'reselect';

import { navTreeSelector } from 'selectors/navTree';
const toggleStateSelector = state => state.nav.toggleState;
const toggleVisibilitySelector = state => state.nav.toggleVisibility.visible;

export const navSelector = createSelector(
	[navTreeSelector, toggleStateSelector, toggleVisibilitySelector],
	(tree, toggleState, visible) => {
		return {
			tree,
			toggleState,
			visible,
		};
	}
);
