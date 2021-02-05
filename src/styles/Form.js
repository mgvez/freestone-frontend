
import styled from 'styled-components';
import colors from './Colors';
import { hexToRgb } from './Utils';
import { GridContainerStyle } from './Grid';


export const StyledSingleRecord = styled.section`
	position: relative;

	&.inactive {
		display: none;
	}

	&:nth-of-type(2n) {
		background: ${colors.backgroundMain};
		padding: 20px 20px 20px 0;
	}

	${props => {
		let css = '';
		if (props.isSubform) {
			css += `
				border: 1px solid ${colors.borderForm};
				padding: 10px;
				background: ${colors.backgroundForm};
			`;
			if (props.isSidebarView) {
				css += `
					border-left: 0;
				`;
			} else {
				css += `
					border-top: 0;
				`;
			}
		}
		return css;
	}}

`;

export const TabContentSection = styled.section`
	${props => {
		//styles for root record container
		if (!props.isSubform) {
			return `
				padding: 12px;
				border: 1px ${colors.borderForm} solid;
				${props.hasTopTabs ? 'border-top: 0' : ''};
				${props.hasLeftTabs ? 'border-left: 0' : ''};
				background: ${colors.backgroundForm};
			`;
		}
	}}
`;


export const Subform = styled.section`
	margin: 20px 0;
	padding: 0 10px 10px;
	border: 1px solid ${colors.backgroundMainAccent};
	border-left-width: 10px;
	position: relative;
	background: ${colors.backgroundMain};

	.fcn {
		text-align: right;

		button + button {
			margin-left: 15px;
		}
	}

	&.subform-list section {
		border-left: 10px solid ${colors.accentPrimary};
		margin: 20px 0;
		padding: 0 10px;
		background: rgba(255, 255, 255, 0.4);

		&:first-of-type {
			margin-top: 40px;
		}

		&:nth-of-type(2n) {
			border-color: ${colors.accentPrimaryLight};
			background: ${colors.backgroundLight};
		}
	}
`;

export const SubformHeader = styled.header`
	${GridContainerStyle}
	margin-top: 20px;
	padding-bottom: 20px;
	align-items: center;

	h2 {
		margin-bottom: 0;
	}
`;

const rgbBg = hexToRgb(colors.backgroundDark);
const bg = `rgba(${rgbBg}, 0.2)`;
const border = `rgba(${rgbBg}, 0.6)`;

export const StackContainer = styled.nav`
	.tab {
		text-align: center;
		display: block;
		width: 100%;
		margin: 4px 0 0 0;
		padding: 12px 25px;
		border: 1px solid ${border};
		font-weight: bold;
		background-color: ${bg};
		color: ${colors.white};

		&:hover, &.active {
			background-color: ${colors.accentPrimary};
			/* background-image: linear-gradient(${colors.accentPrimaryAlt}, ${colors.accentPrimary}); */
			text-decoration: none;
		}

		&.active {
			border-color: ${colors.accentPrimary};
			border-bottom: 0;
		}
	}

	.stack-record {
		transition: border-color 1s;
		border: 1px solid transparent;
		padding: 0 10px;
	}
	.stack-record-active {
		border: 1px solid ${colors.accentPrimary};
	}
	
`;

export const ListContainer = styled.div`
	.list-record {
		padding: 0 10px;
	}

`;

export const TabsList = styled.nav`
	border-bottom: 1px solid ${colors.borderForm};
	margin: 10px 0 0 0;
	font-size: 0.8em;

	.tab {
		display: inline-block;
		background: rgba(255, 255, 255, 0.2);
		vertical-align: middle;
		position: relative;
		height: 35px;
		line-height: 35px;
		padding: 0 25px;
		opacity: 0.6;
		font-weight: 600;
		color: ${colors.textPrimary};
		border-style: solid;
		border-width: 1px 1px 0 1px;
		border-color: transparent;
		cursor: pointer;
		white-space: nowrap;

		transition: background 0.3s, color 0.3s;
		margin-right: 5px;
		margin-top: 4px;


		&:hover {
			color: ${colors.linksPrimary};
			background-color: ${colors.white};
			text-decoration: none;
			opacity: 1;
		}
		&.active {
			color: ${colors.linksPrimary};
			border-color: ${colors.borderForm};
			background-color: ${colors.backgroundForm};
			text-decoration: none;
			opacity: 1;
			transform: translate(0, 1px);
		}
	}

	${props => {
		if (props.isSidebarView) {
			return `
				margin: 0;
				display: flex;
				flex-direction: column;
				border-right: 1px solid ${colors.borderForm};
				border-bottom: none;

				.tab {
					display: block;
					margin: 0 0 2px 0;
					border: 1px solid ${colors.backgroundMain};
					border-right: none;

					&.active {
						transform: translate(1px, 0);
						border: 1px solid ${colors.borderForm};
						border-right: none;
					}
				}

			`;
		}
	}}

`;


export const TabbedContainer = styled.div`
	${props => {
		if (props.isSidebarView) {
			return `
				display: flex;
				flex-direction: row;
			`;
		}
	}}
`;

export const Sidebar = styled.div`
	padding: 30px;
	background: ${colors.backgroundDark};
	color: ${colors.textSecondary};

	textarea,
	input[type="text"],
	input[type="search"],
	input[type="password"],
	input[type="email"],
	input[role="combobox"] {
		color: ${colors.textPrimary};
	}

	label {
		color: ${colors.textSecondary};
	}

	ul li {
		color: ${colors.textPrimary};

		&:hover, &:focus {
			color: ${colors.textSecondary};
		}
	}
`;


export const Aside = styled.div`
	padding: 10px 10px;
	background: ${colors.backgroundDark};
	color: ${colors.white};
	
	label {
		color: ${colors.white};
	}

	.sticky & {
		position: fixed;
			top: 170px;
	}

	.absolute & {
		position: absolute;
			top: auto;
			bottom: 0;
	}
`;
