const initialState = {
	openedFrom: '',
	clientScripts: [],
	filesDir: '',
	thumbsDir: '',
	siteName: '',
	adminPath: '',
	websitePath: '',
	clientPath: '',
	pathCss: [],
	languages: [],
};

export function env(state = initialState, action) {
	// console.log(action);
	switch (action.type) {
	case 'ADD_ENV':
		// console.log(action.data);
		return action.data;
	default:
		// console.log('no change');
		return state;
	}
}
