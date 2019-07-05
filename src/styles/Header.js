
import styled, { css } from 'styled-components';
import cssVars from './Variables';
import colors from './Colors';
import { GridContainerStyle, getItemCss } from './Grid';


export const Header = styled.header`
	padding: 25px 40px;
	background: ${colors.backgroundLightest};
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	margin-bottom: 40px;
	position: relative;
	width: 100%;
	${GridContainerStyle};
`;

export const HeaderTexts = styled.div`
	${props => getItemCss(props.columns || props.cols || cssVars.gridColumns, props.offset || 'auto', props.justify, props.align)};
	
	p, ul li {
		margin-bottom: 3px;
		line-height: 1.5em;
	}
`;

export const HeaderFcn = styled.div`
	${props => getItemCss(props.columns || props.cols || cssVars.gridColumns, props.offset || 'auto', props.justify, props.align)};
`;
