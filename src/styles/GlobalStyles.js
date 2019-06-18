import { createGlobalStyle } from 'styled-components';
import ReactComponents from './ReactComponents';
import Reset from './Reset';
import colors from './Colors';
import cssVars from './Variables';

const GlobalStyle = createGlobalStyle`
	
	@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");
	
	${Reset}

	body {
		overflow-x: hidden;
		background: ${colors.backgroundMain};
		font-family: ${cssVars.fontFamilyBase};
		font-size: ${cssVars.fontSizeText};
		color: ${colors.textPrimary};
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

	${ReactComponents}

	.mce-tinymce {
		margin: 10px 0 !important;
		border: 2px solid transparent !important;

		&:focus {
			border: 2px solid ${colors.accentPrimary} !important;
		}
	}

`;

export default GlobalStyle;
