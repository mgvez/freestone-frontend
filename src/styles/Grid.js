
import styled, { css } from 'styled-components';

import cssVars from './Variables';

export const GridContainerStyle = css`
	display: grid;
	grid-template-columns: repeat(${cssVars.gridColumns}, [col-start] 1fr);
	grid-gap: 12px;
	grid-auto-flow: row;
	width: 100%;
`;

export const GridContainer = styled.div`
	${GridContainerStyle};
`;

export function getItemCss(columns, offset, justify, align) {
	return css`
		position: relative;
		grid-column: ${offset} / span ${columns};
		${justify && `justify-self: ${justify};`};
		${align && `align-self: ${align};`};
	`;
}

export const GridItem = styled.div`
	${props => getItemCss(props.columns || props.cols || cssVars.gridColumns, props.offset || 'auto', props.justify, props.align)};
`;

export const MainZone = styled.section`
	width: calc(100% - 80px);
	margin: 40px auto;
`;
