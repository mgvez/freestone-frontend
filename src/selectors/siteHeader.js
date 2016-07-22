import { createSelector } from 'reselect';

const toggleNavVisibilitySelector = state => state.siteHeader.toggleNavVisibility.nav_visibility;

export const siteHeaderSelector = createSelector(
	[toggleNavVisibilitySelector],
	(nav_visibility) => {
		return {
			nav_visibility,
		};
	}
);
