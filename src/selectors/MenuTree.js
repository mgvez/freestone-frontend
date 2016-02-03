import { createSelector } from 'reselect';

function buildTree(navGroups, tables, modules, pages) {
	// console.log('build tree');
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

	return groups.filter(group => group.parent_id === 0);
}


const tablesSelector = state => state.freestone.tables;
const modulesSelector = state => state.freestone.modules;
const pagesSelector = state => state.freestone.pages;
const navGroupsSelector = state => state.freestone.navGroups;

export const menuTreeSelector = createSelector(
	navGroupsSelector,
	tablesSelector,
	modulesSelector,
	pagesSelector,
	(navGroups, tables, modules, pages) => buildTree(navGroups, tables, modules, pages),
);
