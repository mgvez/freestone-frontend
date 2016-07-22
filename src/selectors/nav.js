import { createSelector } from 'reselect';

import { navTreeSelector } from 'selectors/navTree';
const toggleStateSelector = state => state.nav.toggleState;
const toggleVisibilitySelector = state => state.siteHeader.toggleNavVisibility.nav_visibility;

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
