
const prefix = '_freestone';
const lst = 'abcdefghijklmnopqrstuvwxyz';

export default () => {
	let id = '';
	while (id.length < 8) {
		id += lst.charAt(Math.floor(Math.random() * lst.length));
	}
	return `${prefix}_${id}_`;
};
