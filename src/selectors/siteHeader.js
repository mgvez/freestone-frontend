import { createSelector } from 'reselect';

const toggleNavVisibilitySelector = state => state.siteHeader.nav_visibility;
const toggleLoadedRecordsSelector = state => state.siteHeader.loaded_records_visibility;

export const siteHeaderSelector = createSelector(
	[toggleNavVisibilitySelector, toggleLoadedRecordsSelector],
	(nav_visibility, loaded_records_visibility) => {
		return {
			nav_visibility,
			loaded_records_visibility,
		};
	}
);
