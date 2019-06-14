
import styled, { css } from 'styled-components';

export const GRID_COLUMNS = 12;

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(GRID_COLUMNS, [col-start] 1fr);
	grid-gap: 12px;
	grid-auto-flow: row;

	width: 100%;
`;

function getItemCss(props) {
	const columns = props.columns || GRID_COLUMNS;
	return css`
		grid-column: auto / span ${columns};

	`;
}

export const GridItem = styled.div`${props => getItemCss(props)}`;

