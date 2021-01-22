
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
`;

export const Subform = styled.section`
	margin: 20px 0;
	padding: 0 10px 10px;
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
		padding: 0 10px;
	}
	.stack-record-active {
		border-radius: 0 0 5px 5px  ;
		border: 1px solid ${colors.accentPrimary};
	}
	
`;

export const ListContainer = styled.div`
	.list-record {
		padding: 0 10px;
	}

`;

export const TabsContainer = styled.nav`
	border-bottom: 1px solid ${colors.borderMedium};
	margin: 10px 0 0 0;
	font-size: 0.8em;

	.tab {
		background: rgba(255, 255, 255, 0.4);
		display: inline-block;
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

		border-radius: 2px 2px 0 0;

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
			border-color: ${colors.borderMedium};
			background-color: ${colors.white};
			text-decoration: none;
			opacity: 1;
			transform: translate(0, 1px);

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
