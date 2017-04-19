
let params;
function getParams() {
	if (params) return params;
	const query = window.location.search.substring(1);
	params = query.split('&').reduce((all, cur) => {
		const pair = cur.split('=');
		all[pair[0]] = pair[1];
		return all;
	}, {});
	return params;
}

export default (varName) => {
	const p = getParams();
	if (varName) return p[varName];
	return p;
};
