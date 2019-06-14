
import styled, { css } from 'styled-components';
import colors from './Colors';
import { darken, lighten } from './Utils';


function getCss(props) {
	
	return css`
		display: inline-block;
		width: 100%;
		height: 2.2em;
		line-height:2.2em;
		border: 2px solid transparent;

		padding: 0 10px;
		margin: 0 0 0.7em;

		&:focus {
			border: 2px solid ${colors.accentPrimary};
			outline: none;
		}

		${props.search && `
			width: 200px;
			vertical-align: middle;
			margin-right: 5px;
		`};

		${props.bordered && `
			border: 2px solid ${colors.borderDark};
		`};

	`;
}

export const Input = styled.input`${props => getCss(props)}`;
export const Textarea = styled.textarea`${props => getCss(props)}`;
