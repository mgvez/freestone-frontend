
import styled from 'styled-components';
import cssVars from './Variables';
import colors from './Colors';
import { GridContainerStyle, getItemCss } from './Grid';

const popoutHeight = 30;
const headerMarginBottom = 10;


// top -1px is used for intersection observer, to detect when element becomes sticky
export const FixedHeaderContainer = styled.header`
	width: 100%;
	position: sticky;
	top: -1px;
	z-index: 5000;
	pointer-events: none;

	${props => {
		const finalHeight = props.contentHeight + headerMarginBottom || headerMarginBottom;
		return `height: ${finalHeight}px;`;
	}}

	&> div {
		pointer-events: auto;
	}
	
`;

export const Header = styled.div`
	padding: 25px 40px;
	background: ${colors.backgroundLightest};
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	position: relative;
	width: 100%;
	${GridContainerStyle};


	&.prod-warning-enhance {
		background: rgb(255, 245, 201);
	}

	&.light {
		justify-content: space-between;
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
`;

export const Popout = styled.div`
	height: ${popoutHeight}px;
	position: relative;
	display: flex;
	justify-content: flex-end;
	padding-right: 30px;
	transform: translate(0, -1px);
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
