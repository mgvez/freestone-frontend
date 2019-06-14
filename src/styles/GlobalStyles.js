import { createGlobalStyle } from 'styled-components';
import Texts from './Texts';
import Reset from './Reset';
import colors from './Colors';

export const GUTTER_WIDTH = '30px';

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-webkit-tap-highlight-color: transparent;
	}

	html {

	}

	body {
		overflow-x: hidden;
		background: ${colors.backgroundMain};
	}


	${Reset}
	${Texts}

	img {
		max-width: 100%;
	}

	iframe.module {
		.field-deps {
			.field-deps-title {
				color: red;
			}
		}
	}
`;

export default GlobalStyle;
