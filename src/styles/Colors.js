import { hexToRgb } from './Utils';


const gray31 = '#4a4a4a';
const gray43 = '#62666c';
const gray45 = '#686b6c';
const gray51 = '#79797a';
const gray76 = '#bababb';
const gray86 = '#d4d8d9';
const gray90 = '#e1e1e1';
const gray93 = '#e7eaec';
const gray96 = '#f3f3f3';
const gray97 = '#f6f6f6';

const teal62 = '#19aa8d';
const rgbTeal = hexToRgb(teal62);
const tealLight = `rgba(${rgbTeal}, 0.8)`;
const tealLighter = `rgba(${rgbTeal}, 0.5)`;

const yellow76 = '#f8ac59';

const red58 = '#ed5565';

const blue95 = '#eff2f5';
const blue86 = '#ced9e3';
const blue66 = '#00aeef';
const blue54 = '#028cc0';
const blue37 = '#4b5863';
const blue26 = '#2f4050';
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
	accentPrimaryLighter: tealLighter,
	accentSecondary: blue26,
	warnPrimary: yellow76,
	dangerPrimary: red58,

	backgroundLightest: white,
	backgroundLight: gray97,
	backgroundMain: gray93,
	backgroundMainAccent: gray86,
	backgroundDark: blue26,
	backgroundDarkHover: blue23,

	borderDark: blue23,
	borderMedium: gray76,
	borderLight: gray93,

	textPrimary: gray45,
	textSecondary: white,
	linksPrimary: blue26,
	linksPrimaryHover: blue54,

	navLinkBackground: blue86,
	navLinkHoverBackground: blue95,

};

export default colors;
