import { createGlobalStyle } from 'styled-components';
import ReactComponents from './ReactComponents';
import Reset from './Reset';
import colors from './Colors';
import cssVars from './Variables';
import { unorderedLists } from './Texts';

const GlobalStyle = createGlobalStyle`
	@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");
	@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css");
	
	${Reset}

	body {
		overflow-x: hidden;
		background: ${colors.backgroundMain};
		font-family: ${cssVars.fontFamilyBase};
		font-size: ${cssVars.fontSizeText};
		color: ${colors.textPrimary};
		font-weight: ${cssVars.fontWeightNormal};
	}

	img {
		max-width: 100%;
	}

	a {
		color: ${colors.linksPrimary};
		text-decoration: none;
		&:hover, &:active {
			color: ${colors.linksPrimaryHover};
			text-decoration: none;
		}
	}

	iframe.module {
		.field-deps {
			.field-deps-title {
				color: red;
			}
		}
	}

	td {
		line-height: 1.3;
	}

	.disabled {
		opacity: 0.9;
		pointer-events: none; 
		cursor: default;
	}

	${ReactComponents}

	.mce-tinymce {
		margin: 10px 0 !important;
		border: 2px solid transparent !important;

		&:focus {
			border: 2px solid ${colors.accentPrimary} !important;
		}
	}

	ul {
		${unorderedLists};
	}

`;

export default GlobalStyle;
