
import styled, { css } from 'styled-components';

import cssVars from './Variables';

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(${cssVars.gridColumns}, [col-start] 1fr);
	grid-gap: 12px;
	grid-auto-flow: row;
	width: 100%;
`;

function getItemCss(columns, justify) {
	return css`
		grid-column: auto / span ${columns};
		${justify && `justify-self: ${justify};`};
	`;
}

export const GridItem = styled.div`${props => getItemCss(props.columns || props.cols || cssVars.gridColumns, props.justify)}`;

export const MainZone = styled.section`
	width: 90%;
	margin-left: auto;
	margin-right: auto;
`;
