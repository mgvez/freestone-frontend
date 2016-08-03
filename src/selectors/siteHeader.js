import { createSelector } from 'reselect';
import { loadedRecordsNumber as loadedRecordsNumberSelector } from 'selectors/loadedRecordsNumber';

const toggleNavVisibilitySelector = state => state.siteHeader.nav_visibility;
const toggleLoadedRecordsSelector = state => state.siteHeader.loaded_records_visibility;

export const siteHeaderSelector = createSelector(
	[toggleNavVisibilitySelector, toggleLoadedRecordsSelector, loadedRecordsNumberSelector],
	(nav_visibility, loaded_records_visibility, loadedRecordsNumber) => {
		return {
			nav_visibility,
			loaded_records_visibility,
			...loadedRecordsNumber,
		};
	}
);
