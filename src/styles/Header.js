
import styled from 'styled-components';
import cssVars from './Variables';
import colors from './Colors';
import { GridContainerStyle, getItemCss } from './Grid';
const headerMarginBottom = 60;


export const Header = styled.header`
	padding: 25px 40px;
	background: ${colors.backgroundLightest};
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	margin-bottom: 40px;
	position: relative;
	width: 100%;
	${GridContainerStyle};

	margin-bottom: ${headerMarginBottom}px;

	&.prod-warning-enhance {
		background: rgb(255, 245, 201);
	}

	&.light {
		justify-content: space-between;
		position: fixed;
			top: 0;
			left: 0;
		transition: transform 0.3s ease;
		z-index: 5;
		padding-left: calc(250px + 40px);

		padding-top: 15px;
		padding-bottom: 15px;
	}
	
	.permalinks {
		line-height: 1.3em;
		
		span {
			font-weight: bold;
			text-transform: uppercase;
		}
	}

	.last-modif-date {
		margin: 20px 0 10px 0;
		font-weight: ${cssVars.fontWeightMedium};
	}


	.popout {
		position: absolute;
		bottom:0;
		right: 30px;

		display: flex;
		transform: translate(0, 100%);
	}
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
