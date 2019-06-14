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

	.react-autosuggest__container {
		position: relative;

		&:after {
			position: absolute;
				top: calc(50% - 5px);
				right: 20px;

			content: '\f107';
			font-family: 'FontAwesome';
			font-size: 20px;
			color: ${colors.textPrimary};
			transform: translate(0, -50%);
		}

		input {
			display: inline-block;
			width: 100%;
			height: 2.2em;
			line-height:2.2em;
			border: 2px solid transparent;

			padding: 0 10px;
			margin: 0 0 0.7em;
		}
	}


	.react-autosuggest__container--open {

		.react-autosuggest__suggestions-container {
			display: block;
			position: absolute;
			top: 50px;
			background-color: #fff;
			z-index: 200000;
			max-height: 400px;
			border: 1px solid #aaa;
			overflow:auto;
		}

		.react-autosuggest__suggestion--highlighted {
			background: ${colors.accentPrimary};
			color: #fff;

		}

	}

	.react-autosuggest__suggestions-container {
		display: none;
		width: 100%;
	}


	.react-autosuggest__suggestions-list {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	.react-autosuggest__suggestion {
		cursor: pointer;
		padding: 10px 20px;
	}

	.react-autosuggest__suggestion--focused {
		background-color: #ddd;
		color: #fff;
	}

	.react-autosuggest__section-title {
		padding: 10px 0 0 10px;
		font-size: 12px;
		color: #777;
		border-top: 1px dashed #ccc;
	}

	.react-autosuggest__section-container:first-child .react-autosuggest__section-title {
		border-top: 0;
	}


	.react-autosuggest__container{
		position:relative;
	}


	ul.react-autosuggest__suggestions-container{
		list-style-type:none;
		margin:0;
		padding:0;
		position:absolute;
		top: 40px;
		background:white;
		border:1px ${colors.gray86} solid;
		z-index:1000;
	}

	li.react-autosuggest__suggestion{
		cursor:pointer;
		border-bottom: 1px ${colors.gray86} solid;
		padding:4px 10px;
		&:before{
			content:"-";
			color:transparent;
		}
	}

	li.react-autosuggest__suggestion--focused{
		background: ${colors.teal62};
	}

`;

export default GlobalStyle;
