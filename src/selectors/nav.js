import { createSelector } from 'reselect';

import { navTreeSelector } from 'selectors/navTree';
const toggleStateSelector = state => state.nav.toggleState;
const usernameSelector = state => state.auth.userName;

export const navSelector = createSelector(
	[navTreeSelector, toggleStateSelector, usernameSelector],
	(tree, toggleState, username) => {
		return {
			tree,
			toggleState,
			username,
		};
	}
);
