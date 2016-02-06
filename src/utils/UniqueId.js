
const prefix = '__freestone__';

export default () => {
	const incr = Number(new Date);
	return `${prefix}${incr}`;
};
