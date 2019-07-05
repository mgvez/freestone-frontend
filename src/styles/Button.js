
import styled, { css } from 'styled-components';
import vars from './Variables';
import colors from './Colors';
import { darken, lighten } from './Utils';
import { NavLink } from 'react-router-dom';

function buttonColorModifier(color, bordered) {
	return `
		background: ${color};

		:hover {
			background: ${darken(color, 0.2)};
		}

		${bordered && `
			background: transparent;
			border-color: ${color};
			color: ${color};

			:hover {
				background: ${color};
				color: ${colors.white};
			}
		`}
	`;
}

function getCss(props) {
	let mainColor = colors.accentPrimary;
	if (props.warn) mainColor = colors.warnPrimary;
	if (props.danger) mainColor = colors.dangerPrimary;
	if (props.info) mainColor = colors.backgroundDark;
	if (props.cta) mainColor = colors.accentPrimary;
	if (props.lighter) mainColor = colors.white;

	if (props.faded) mainColor = lighten(mainColor, 0.5);
	if (props.inline) mainColor = 'transparent';

	let height = 30;
	if (props.small) height = 24;
	if (props.tiny) height = 16;

	return css`
		${props.margin && `margin: ${props.margin};`}
		padding: 0 15px;

		border: none;
		outline: none;
		text-decoration: none;

		cursor: pointer;
		display: inline-block;
		vertical-align: middle;
		border-radius: 5px;

		color: ${colors.textSecondary};

		height: ${height}px;
		line-height: ${height}px;
		font-weight: ${vars.fontWeightSemibold};

		transition: color 0.3s, background 0.3s;

		white-space: nowrap;

		& + &, a + &, & + a {
			margin-left: 10px;
		}

		&:hover {
			text-decoration: none;
			color: ${colors.textSecondary};
			background: ${darken(colors.accentPrimary, 0.2)};
		}

		${props.fullwidth && `
			width: 100%;
			margin: 0.8em 0 1.5em 0;
		`};

		${props.mediumwidth && `
			width: 150px;
		`};

		${props.small && `
			padding: 0 10px;
			font-size: 0.8em;
		`};

		${props.tiny && `
			padding: 0 4px;
			font-size: 0.6em;
		`};

		${props.lighter && `
			color: ${colors.textPrimary}
		`};

		${props.bordered && `
			background: transparent;
			border: 2px solid ${mainColor};
			line-height: ${height - 4}px;
			color: ${mainColor};

			${props.small && `
				border: 1px solid ${mainColor};
				line-height: ${height - 2}px;
			`}

			&:hover {
				background: ${mainColor};
				color: $white;
			}
		`};

		${props.circle && `
			text-align: center;
			width: 40px;
			height: 40px;
			line-height: 40px;
			border-radius: 100%;

			padding: 0;

			i {
				margin: 0;
			}

			${props.small && `
				width: ${height}px;
				height: ${height}px;
				line-height: ${height}px;
			`};
			
			${props.tiny && `
				width: 18px;
				height: 18px;
				line-height: 18px;
				font-size: 0.8em;

			`};
		`};

		${props.underline && `
			text-decoration: underline;
			text-underline-position: under;
		`};

		${props.icon && `i {
			margin: 0;
		}`};

		${props.round && 'border-radius: 15px;'};
		${props.flat && `
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		`};
		
		${props.inputCta && `
			position: absolute;
				top: 0;
				right: 0;
			height: 100%;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
			border-top-right-radius: 15px;
			border-bottom-right-radius: 15px;
		`};

		${buttonColorModifier(mainColor, props.bordered)};

		${props.inline && `
			color: ${colors.linksPrimary};
			border-radius: 0px;
			border: none;

			&:hover {
				background: transparent;
				color: ${colors.accentPrimary};

			}
		`};
	`;
}

export const Button = styled.button`${props => getCss(props)}`;
export const NavLinkButton = styled(NavLink)`${props => getCss(props)}`;
export const FlatTopButton = styled.a`${props => getCss(props)}`;
