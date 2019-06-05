
import { css } from 'styled-components';
import colors from './Colors';

const fontFamilyBase = '"Open Sans", Helvetica, Arial, sans';

const fontWeightLight = 300;
const fontWeightNormal = 400;
const fontWeightMedium = 500;
const fontWeightSemibold = 600;
const fontWeightBold = 700;
const fontWeightExtrabold = 800;

const Texts = css`

	* {
		-webkit-font-smooting: antialiased;
	}

	body {
		font-family: ${fontFamilyBase};
		font-size: 14px;
	}

`;

const title = `line-height: 1;
	margin: 0;
	font-family: ${fontFamilyBase};
	text-transform: none;
	font-weight: ${fontWeightLight};`;

export const Heading1 = css`
	${title}
	margin-bottom: 10px;
`;

export const Heading2 = css`
	${title}
	margin-bottom: 40px;
`;

export const Heading3 = css`
	${title}
	font-size: 18px;
	font-weight: ${fontWeightExtrabold};
`;

export const Heading4 = css`
	${title}
	font-size: 16px;
	margin: 10px 0 6px;
	font-weight: ${fontWeightBold};
`;
