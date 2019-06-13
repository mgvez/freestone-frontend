
import styled, { css } from 'styled-components';
import cssVars from './Variables';


const Texts = css`

	* {
		-webkit-font-smooting: antialiased;
	}

	body {
		font-family: ${cssVars.fontFamilyBase};
		font-size: ${cssVars.fontSizeText};
	}

`;

const title = `line-height: 1;
	margin: 0;
	font-family: ${cssVars.fontFamilyBase};
	text-transform: none;
	font-weight: ${cssVars.fontWeightLight};`;

export const Heading1 = styled.h1`
	${title}
	font-size: ${cssVars.fontSizeTitle1};
	margin-bottom: 10px;
`;

export const Heading2 = styled.h2`
	${title}
	font-size: ${cssVars.fontSizeTitle2};
	margin-bottom: 20px;
`;

export const Heading3 = styled.h3`
	${title}
	font-size: ${cssVars.fontSizeTitle3};

`;

export const Heading4 = styled.h4`
	${title}
	font-size: ${cssVars.fontSizeTitle4};
	margin: 10px 0 6px;
	font-weight: ${cssVars.fontWeightBold};
`;
