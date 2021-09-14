
import styled, { css } from 'styled-components';
import colors from './Colors';
import cssVars from './Variables';
import { textMedium, textSmall } from './Texts';
import { hexToRgb } from './Utils';

export const DISPLAYSIZE_SMALL = 'small';
export const DISPLAYSIZE_MEDIUM = 'medium';
export const DISPLAYSIZE_LARGE = 'large';

function getFieldCss(displaySize) {
	return css`
		${displaySize === DISPLAYSIZE_SMALL && textSmall};
		${displaySize === DISPLAYSIZE_MEDIUM && textMedium};
		height: 100%;
		padding-bottom: 10px;
	`;
}

function getFieldGroupCss(props) {

	return css`
		display: block;
		padding: 0 10px 10px;
		margin-bottom: 10px;

		${props.isRoot && `
			padding: 0;
		`}

		${props.isCollapsable && `
			padding-top: 10px;
			border-top: 3px solid ${colors.backgroundMainAccent};
			background: rgba(255, 255, 255, 0.25);
		`};
	`;
}

export function getInputCss(props) {
	return css`
		display: inline-block;
		width: 100%;
		min-height: 2.2em;
		line-height:2.2em;
		border: 1px solid rgba(${hexToRgb(colors.textPrimary)}, 0.25);
		color: ${colors.textPrimary};

		padding: 2px 10px;
		margin: 0 0 0.7em;

		transition: border-color 0.2s ease;

		&:focus {
			border: 1px solid ${colors.accentPrimary};
			outline: none;
		}

		&::placeholder {

			opacity: 0.3;
		}

		${props.search && `
			width: 200px;
			vertical-align: middle;
			margin-right: 5px;
		`};

		${props.bordered && `
			border: 1px solid ${colors.borderDark};
		`};

		${props.rounded && `
			padding-right: 65px;
		`};

		&[size]{
			max-width: 100%;
		}

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

export const WidgetField = styled.div`
	padding: 10px;
	margin: 0 0 0.7em;
	background: ${colors.backgroundMainAccent};
	border: 1px ${colors.borderFormAccent} solid;
`;

export const FieldDescription = styled.div`
	display: block;
	margin: 0 0.5em 0.7em;
	font-size: calc(11 / 14 * 1em);
	letter-spacing: 1.05;
	line-height: 1.3;
`;

function getCheckboxContainer(props) {
	return css`
	text-align: left;

	${props.startAlign && `
		align-self: flex-start;
	`};

	input {
		display: none;

		&:checked + label:after {
			display: block;
		}
	}

	label {
		display: inline-block;
		position: relative;
		padding-left: 30px;
		font-weight: ${cssVars.fontWeightNormal};
		cursor: pointer;
		line-height: 1.4;
		height: auto;
		text-align: left;

		margin: 10px 0;

		&:before {
			content: ' ';
			display: block;

			position: absolute;
				top: 2px;
				left: 0;

			width: 15px;
			height: 15px;
			background: ${colors.backgroundLightest};
			border: 1px solid ${colors.backgroundMainAccent};
		}

		&:after {
			font-family: 'Font Awesome\ 5 Free';
			font-weight: 900;
			content: '\f00c';
			display: none;
			line-height: 1;
			font-size: 10px;
			color: ${colors.accentPrimary};

			position: absolute;
				top: 9px;
				left: 2.5px;

			transform: translate(0, -50%);
		}
	}
	`;
}

export const Input = styled.input`${props => getInputCss(props)}`;
export const Textarea = styled.textarea`${props => getInputCss(props)}`;

export const StyledField = styled.div`${props => getFieldCss(props.displaySize)}`;
export const StyledFieldGroup = styled.div`${props => getFieldGroupCss(props)}`;
export const CheckboxContainer = styled.div`${props => getCheckboxContainer(props)}`;


function getToggleCss(props) {
	return css`
		input[type="checkbox"] {
			display: none;

			&:checked + label {
				background: ${colors.positive};

				&:after {
					left: ${props.hasVal ? 'calc(100% - 28px)' : 'calc(50% - 28px)'};
				}

				&:before {
					content: ${props.hasVal ? 'attr(data-on-label)' : ''};
					left: 7.5px;
				}
			}

			& + label {
				${!props.hasVal && props.showAsChecked && `
					background: ${colors.positive};
					
				`}
			}

			&:disabled + label {
				opacity: 0.4;
				cursor: default;
			}

			${props.small && `
				&:checked + label {
					&:after {
						left: ${props.hasVal ? 'calc(100% - 16px)' : 'calc(50% - 16px)'};
					}

					&:before {
						left: 6px;
					}
				}
			`};
		}

		label {

			cursor: pointer;
			
			position: relative;
			display: block;
			width: 0;
			height: 34px;
			padding: 0 35px;

			margin: 10px 0;
			background: ${colors.negative};
			border: 2px solid transparent;
			border-radius: 17px;

			transition: background 0.2s;
			${!props.hasVal && `
				background: ${colors.neutral};
				opacity: 0.6;
			`}

			&:after {
				position: absolute;
					top: 2px;
					left: ${props.hasVal ? '2px' : 'calc(50% - 14px)'};

				height: 26px;
				width: 26px;
				content: ' ';
				background: #fff;
				border-radius: 50%;

				transition: left 0.2s;
			}

			&:before {
				content: ${props.hasVal ? 'attr(data-off-label)' : ''};
				color: ${colors.white};

				position: absolute;
					top: 0;
					right: 7.5px;

				line-height: 30px;
			}

			${props.readonly && `
				opacity: 0.6;
				cursor: default;
			`}

			${props.small && `
				height: 22px;
				padding: 0 23px;
				font-size: 0.9em;
				border-radius: 11px;

				&:after {
					top: 1px;
					left: ${props.hasVal ? '1px' : 'calc(50% - 8px)'};
					height: 16px;
					width: 16px;
				}

				&:before {

					position: absolute;
						top: 0;
						right: 5px;

					line-height: 19px;
				}

			`};
		}
	`;
}
export const ToggleContainer = styled.div`${props => getToggleCss(props)}`;
