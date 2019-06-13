import leftPad from 'left-pad';

export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

export function intColorToHex(color) {
	return leftPad(color.toString(16), 6, '0');
}

export function hexToColorInt(color) {
	return parseInt(color.replace('#', ''), 16);
}

export function shadeColor2(color, percent) {
	var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF; // eslint-disable-line
	return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);// eslint-disable-line
}

export function blendColors(c0, c1, p) {
	var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;// eslint-disable-line
	return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1); // eslint-disable-line
}

export const darken = (color, prc) => shadeColor2(color, -prc);
export const lighten = (color, prc) => shadeColor2(color, prc);

export function triangle(width, color, side) {
	return `
		content: ' ';
		display: block;
		width:0;
		height:0;

		${(side === 'left' || side === 'right') && `
			border-top: ${width} solid transparent;
			border-bottom: ${width} solid transparent;
		`};

		${(side === 'top' || side === 'bottom') && `
			border-left: ${width} solid transparent;
			border-right: ${width} solid transparent;
		`};
		
		${side === 'left' && `
			border-right: ${width} solid ${color};
		`};

		${side === 'right' && `
			border-left: ${width} solid ${color};
		`};

		${side === 'top' && `
			border-bottom: ${width} solid ${color};
		`};

		${side === 'bottom' && `
			border-top: ${width} solid ${color};
		`};
	`;
}
