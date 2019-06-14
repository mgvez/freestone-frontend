
import styled, { css } from 'styled-components';
import colors from './Colors';
import cssVars from './Variables';
import { textMedium, textSmall } from './Texts';
import { darken, lighten } from './Utils';


function getFieldCss(props) {

	return css`

		${props.displaySize === 'small' && textSmall};
		${props.displaySize === 'medium' && textMedium};

	`;
}

function getFieldGroupCss(props) {

	return css`
		display: block;

	`;
}

export function getInputCss(props) {
	
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


export const FieldLabel = styled.div`
	padding-top: 0.7em;
	margin-bottom: 0.7em;
	font-weight: ${cssVars.fontWeightBold};
	padding-right: 45px;
	display: block;
	position: relative;
	color: ${colors.accentSecondary};

	em {
		display: inline-block;
		vertical-align: -2%;
		margin-left: 0.4em;
		font-style: normal;
		text-transform: uppercase;

		span {
			color: ${colors.accentPrimary};
		}
	}
`;

export const FieldDescription = styled.div`
	display: block;
	margin-bottom: 0.7em;
	margin-left: 0.5em;
	font-size: 0.8em;
`;

export const Input = styled.input`${props => getInputCss(props)}`;
export const Textarea = styled.textarea`${props => getInputCss(props)}`;

export const StyledField = styled.div`${props => getFieldCss(props)}`;
export const StyledFieldGroup = styled.div`${props => getFieldGroupCss(props)}`;
