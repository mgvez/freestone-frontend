
import styled, { css } from 'styled-components';
import colors from './Colors';
import { darken, lighten, hexToRgb } from './Utils';
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
`;

export const Subform = styled.section`
	margin: 30px 0;
	padding: 0 20px 10px;
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	border-left: 10px solid ${colors.backgroundMainAccent};
	position: relative;
	border-radius: 5px;

	.fcn {
		text-align: right;

		button + button {
			margin-left: 15px;
		}
	}

	&.subform-list section {
		border-left: 10px solid ${colors.accentPrimary};
		border-radius: 5px;
		margin: 20px 0;
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
		border-radius: 2px;
		padding: 12px 25px;
		border: 1px solid ${border};
		font-weight: bold;
		background-color: ${bg};
		color: ${colors.white};
		transition: border-radius 1s;


		&:hover, &.active {
			background-color: ${colors.accentPrimary};
			/* background-image: linear-gradient(${colors.accentPrimaryAlt}, ${colors.accentPrimary}); */
			text-decoration: none;
		}

		&.active {
			border-color: ${colors.accentPrimary};
			border-bottom: 0;
			border-radius: 5px 5px 0 0 ;
		}
	}

	.stack-record {
		transition: border-color 1s;
		border: 1px solid transparent;
	}
	.stack-record-active {
		border-radius: 0 0 5px 5px  ;
		border: 1px solid ${colors.accentPrimary};
	}
	
`;

export const TabsContainer = styled.nav`
	border-bottom: 1px solid ${colors.accentPrimary};
	margin: 40px 0;
	.tab {
		background: transparent;
		display: inline-block;
		vertical-align: middle;

		height: 25px;
		line-height: 25px;
		padding: 0 25px;

		border: 1px solid ${colors.accentPrimary};
		border-bottom: none;

		color: ${colors.accentPrimary};
		cursor: pointer;

		border-radius: 5px 5px 0 0;

		transition: background 0.3s, color 0.3s;

		& + .tab {
			margin-left: 10px;
		}

		&:hover, &.active {
			color: ${colors.white};
			background-color: ${colors.accentPrimary};
			text-decoration: none;
		}
	}

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
