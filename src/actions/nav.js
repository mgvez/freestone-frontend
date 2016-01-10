import { FREESTONE_API } from 'middleware/api';


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
		return dispatch({
			[FREESTONE_API]: {
				types: ['AJAX_REQUEST', 'ADD_FREESTONE', 'AJAX_FAILURE'],
				route: 'main',
			},
		});
	};


}
