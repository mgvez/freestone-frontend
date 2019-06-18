
import styled, { css } from 'styled-components';
import cssVars from './Variables';
import colors from './Colors';


export const Header = styled.header`
	padding: 25px 40px;
	background: ${colors.backgroundLightest};
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	margin-bottom: 60px;
	position: relative;
	width: 100%;
	display:flex;
	justify-content: space-between;
	align-items: center;

`;

export const HeaderTexts = styled.div`
	flex-basis: 60%;
`;

export const HeaderFcn = styled.div`
	align-self: flex-end;
	justify-content: flex-end;

	button, a {
		margin-left: 10px;
	}
`;
