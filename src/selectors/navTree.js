import { createSelector } from 'reselect';

const tablesSelector = state => state.nav.structure.tables;
const modulesSelector = state => state.nav.structure.modules;
const pagesSelector = state => state.nav.structure.pages;
const navGroupsSelector = state => state.nav.structure.navGroups;

function checkGroupFilled(group) {
	group.childrenGroups = group.childrenGroups.filter(checkGroupFilled);
	// console.log(group.name, group.childrenGroups.length, group.tables.length, group.modules.length, group.pages.length);
	return group.childrenGroups.length || group.tables.length || group.modules.length || group.pages.length;
}

function buildTree(navGroups, tables, modules, pages) {
	const groups = navGroups.map((group) => {
		const groupId = group.id;
		return {
			...group,
			tables: tables.filter((table) => {
				return table.group_id === groupId;
			}),
			modules: modules.filter((module) => {
				return module.group_id === groupId;
			}),
			pages: pages.filter((page) => {
				return page.group_id === groupId;
			}),
			childrenGroups: [],
		};
	});

	groups.filter(group => group.parent_id !== 0).forEach((group) => {
		const parent = groups.find(candidate => candidate.id === group.parent_id);
		if (parent) {
			parent.childrenGroups.push(group);
		}
	});

	return groups.filter(checkGroupFilled).filter(group => {
		return group.parent_id === 0;
	});
}

export const navTreeSelector = createSelector(
	navGroupsSelector,
	tablesSelector,
	modulesSelector,
	pagesSelector,
	(navGroups, tables, modules, pages) => {
		return buildTree(navGroups, tables, modules, pages);
	}
);
