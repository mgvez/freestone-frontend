import { createSelector } from 'reselect';

const toggleNavVisibilitySelector = state => state.siteHeader.toggleNavVisibility.nav_visibility;
const toggleLoadedRecordsSelector = state => state.siteHeader.toggleLoadedRecords.loaded_records_visibility;

export const siteHeaderSelector = createSelector(
	[toggleNavVisibilitySelector, toggleLoadedRecordsSelector],
	(nav_visibility, loaded_records_visibility) => {
		return {
			nav_visibility,
			loaded_records_visibility,
		};
	}
);
