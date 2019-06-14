
import styled, { css } from 'styled-components';
import colors from './Colors';

export const TabsContainer = styled.nav`
	border-bottom: 1px solid ${colors.accentPrimary};
	margin-top: 40px;
	& > div {
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

		& + div {
			margin-left: 10px;
		}

		&:hover, &.active {
			color: ${colors.white};
			background-color: ${colors.accentPrimary};
			text-decoration: none;
		}
	}
`;
