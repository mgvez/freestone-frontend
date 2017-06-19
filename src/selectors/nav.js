import { createSelector } from 'reselect';

import { navTreeSelector } from './navTree';
const toggleStateSelector = state => state.nav.toggleState;
const toggleVisibilitySelector = state => state.siteHeader.nav_visibility;

const tablesSelector = state => state.nav.structure.tables;
const modulesSelector = state => state.nav.structure.modules;
const pagesSelector = state => state.nav.structure.pages;

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


function filterDashboard(items) {
	return items && items.filter(item => item.isDisplayedOnDashboard);
}

export const dashboardSelector = createSelector(
	[tablesSelector, modulesSelector, pagesSelector],
	(tables, modules, pages) => {
		return {
			tables: filterDashboard(tables),
			modules: filterDashboard(modules),
			pages: filterDashboard(pages),
		};
	}
);
