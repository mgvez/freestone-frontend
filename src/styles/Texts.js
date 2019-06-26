
import styled from 'styled-components';
import cssVars from './Variables';

export const textMedium = 'font-size: 11px;';
export const textSmall = 'font-size: 9px;';

const title = `
	line-height: 1;
	margin: 0;
	font-family: ${cssVars.fontFamilyBase};
	text-transform: none;
	font-weight: ${cssVars.fontWeightNormal};
	span {
		font-size: 0.7em;
		font-weight: normal;
	}

`;

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


export const ErrorTitle = styled(Heading3)`
	color:red;
	text-transform:uppercase;
	margin:0 0 20px 0;
`;

export const ErrorMessage = styled.div`
	background: #ffdddd;
	color:red;
	border-radius: 5px;
	padding: 10px;
	margin: 20px 0;
`;

export const unorderedLists = `
	padding-left: 40px;

	li {
		list-style-type: disc;
	}
`;
