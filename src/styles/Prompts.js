
import styled, { css } from 'styled-components';
import colors from './Colors';
import { triangle, hexToRgb } from './Utils';


const tooltipBgColor = `rgba(${hexToRgb(colors.backgroundDark)}, 0.9)`;
export const Tooltip = styled.div`
	
	display: block;
	background: ${tooltipBgColor};
	font-size: 12px;
	color: ${colors.white};
	padding: 10px;
	border-radius: 5px;

	width: 260px;

	position: absolute;
		top: -10px;
		left: 50%;

	transform: translate(-50%, -100%);

	&:after {
		display: block;
		content: ' ';

		position: absolute;
			bottom: 0;
			left: 50%;

		transform: translate(-50%, 100%);

		${triangle('10px', tooltipBgColor, 'bottom')}
	}
`;

export const PromptContainer = styled.div`
	position: relative;
	&.active {
		z-index: 2;
	}
`;


function getWidgetCss(props) {
	
	let bgColor = colors.backgroundMain;
	if (props.light) bgColor = colors.white;

	return `
		background: ${bgColor};
		padding: 10px 0;

		position: absolute;
			top: 40px;
			left: 0;

		width: 160px;

		&:before {
			content: ' ';
			position: absolute;
				top: 0;
				left: 50px;

			transform: translate(-50%, -100%);
			${triangle('10px', bgColor, 'top')}
		}

		${props.large && `
			width: auto;
			white-space: nowrap;
			padding: 10px;
		`};

		li {
			border-bottom: 1px ${colors.borderLight} solid;
			padding: 4px 0;
		}
	`;
}

export const PromptWidget = styled.div`${props => getWidgetCss(props)}`;