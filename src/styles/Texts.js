
import styled from 'styled-components';
import cssVars from './Variables';
import colors from './Colors';

export const textMedium = 'font-size: 11px;';
export const textSmall = 'font-size: 9px;';

const title = `
	line-height: 1.3;
	margin: 0;
	font-family: ${cssVars.fontFamilyBase};
	text-transform: none;
	font-weight: ${cssVars.fontWeightNormal};
	span {
		font-size: 0.7em;
		font-weight: normal;
	}

	&:last-child {
		margin-bottom: 0;
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

export const Paragraph = styled.div`
	margin: 1em 0;
`;

export const Label = styled.div`
	padding: 4px;
	margin: 0 4px;

	border: none;
	outline: none;
	text-decoration: none;

	display: inline-block;
	vertical-align: middle;
	border-radius: 5px;
	color: ${colors.textSecondary};
	font-weight: ${cssVars.fontWeightSemibold};
	white-space: nowrap;
	background: ${colors.accentSecondary};

`;

export const unorderedLists = `
	padding-left: 40px;

	li {
		list-style-type: disc;
	}
`;
