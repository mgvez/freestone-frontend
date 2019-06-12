
import styled, { css } from 'styled-components';
import colors from './Colors';
import { darken } from './Utils';
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

	return css`
		margin: 0;
		padding: 0 20px;

		border: none;
		outline: none;
		text-decoration: none;

		cursor: pointer;
		display: inline-block;
		vertical-align: middle;
		border-radius: 5px;

		background: ${colors.accentPrimary};
		color: ${colors.textSecondary};

		height: 30px;
		line-height: 30px;

		transition: color 0.3s, background 0.3s;

		i {
			margin-right: 10px;
		}

		&:hover {
			text-decoration: none;
			color: ${colors.textSecondary};
			background: ${darken(colors.accentPrimary, 0.2)};
		}

		${props.small && `
			height: 24px;
			line-height: 24px;
			padding: 0 15px;
			font-size: 0.8em;
		`}

		${props.bordered && `
			background: transparent;
			border: 2px solid ${colors.accentPrimary};
			color: ${colors.accentPrimary};
			line-height: 28px;

			&:hover {
				background: ${colors.accentPrimary};
				color: $white;
			}
		`}

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
				width: 30px;
				height: 30px;
				line-height: 30px;
			`}
		`}

		${props.round && 'border-radius: 15px;'}
		
		${props.warn && buttonColorModifier(colors.warnPrimary, props.bordered)}
		${props.danger && buttonColorModifier(colors.dangerPrimary, props.bordered)}
		${props.info && buttonColorModifier(colors.backgroundDark, props.bordered)}
		${props.cta && buttonColorModifier(colors.blue37, props.bordered)}
		${props.lighter && buttonColorModifier(colors.white, props.bordered)}
		${props.faded && buttonColorModifier(colors.gray86, props.bordered)}

	`;
}

export const Button = styled.button`${props => getCss(props)}`;
export const NavLinkButton = styled(NavLink)`${props => getCss(props)}`;
