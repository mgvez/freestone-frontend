
const prefix = '__freestone__';
let incr = 0;

export default () => {
	incr++;
	return `${prefix}${incr}`;
};
