import { hexToRgb } from './Utils';


// const gray31 = '#4a4a4a';
// const gray43 = '#62666c';
const gray45 = '#686b6c';
// const gray51 = '#79797a';
const gray76 = '#bababb';
const gray86 = '#d4d8d9';
// const gray90 = '#e1e1e1';
const gray93 = '#e7eaec';
// const gray96 = '#f3f3f3';
const gray97 = '#f6f6f6';

const teal62 = '#19aa8d';
const teal72 = '#009c80';

const rgbTeal = hexToRgb(teal62);
const tealLight = `rgba(${rgbTeal}, 0.7)`;

const yellow76 = '#f8ac59';
const emphasisBackground = '#c8dfe8';

const red58 = '#ed5565';

const blue95 = '#eff2f5';
const blue86 = '#ced9e3';
const blue82 = '#bacedf';
const blue54 = '#028cc0';
const blue30 = '#404c55';
const blue26 = '#263b4e';
const blue23 = '#293846';

const white = '#ffffff';
const black = '#000000';


//==============================================================================
// COLOR USAGE
//==============================================================================


const colors = {
	
	white,
	black,

	ctaPrimary: teal62,
	accentPrimary: teal62,
	accentPrimaryLight: tealLight,
	emphasisBackground,
	accentSecondary: blue26,
	accentPrimaryAlt: teal72,
	warnPrimary: yellow76,
	dangerPrimary: red58,

	backgroundLightest: white,
	backgroundLight: gray97,
	backgroundMain: gray93,
	backgroundMainAccent: gray86,
	backgroundDark: blue26,
	backgroundDarkHover: blue23,

	borderDark: blue30,
	borderMedium: gray86,
	borderLight: gray93,

	textPrimary: gray45,
	textSecondary: white,
	linksPrimary: blue26,
	linksPrimaryHover: blue54,

	navLinkBackground: blue86,
	navFirstLevelBackground: blue82,
	navLinkHoverBackground: blue95,

};

export default colors;
