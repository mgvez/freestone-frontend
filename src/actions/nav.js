
import { ajax } from './ajax';

function addFreestone(data) {
	// const freestone = data.freestone;
	// let groups = freestone.navGroups.map((group) => {
	// 	const groupId = group.id;

	// 	return {
	// 		...group,
	// 		tables: freestone.tables.filter((table) => {
	// 			return table.group_id === groupId;
	// 		}),
	// 		modules: freestone.modules.filter((module) => {
	// 			return module.group_id === groupId;
	// 		}),
	// 		pages: freestone.pages.filter((page) => {
	// 			return page.group_id === groupId;
	// 		}),
	// 		childrenGroups: [],
	// 	};
	// });

	// groups.filter(group => group.parent_id !== 0).forEach((group) => {
	// 	const parent = groups.find(candidate => candidate.id === group.parent_id);
	// 	if (parent) {
	// 		parent.childrenGroups.push(group);
	// 	}
	// });

	// groups = groups.filter(group => group.parent_id === 0);

	return {
		type: 'ADD_FREESTONE',
		data: data.freestone,
	};
}

let i = 0;
export function testAddGroup() {
	i++;
	return {
		type: 'ADD_NAV_GROUP',
		data: {
			id: `x_${i}`,
			name: `test_group ${i}`,
			parent_id: 0,
		},
	};
}

export function fetchFreestone() {
	return (dispatch) => {
		// console.log(dispatch);
		return ajax('main', {})(dispatch)
		.then((data) => {
			dispatch(addFreestone(data));
		});
	};
}
