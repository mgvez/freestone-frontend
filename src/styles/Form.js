
import styled, { css } from 'styled-components';
import colors from './Colors';
import { darken, lighten } from './Utils';
import { GridContainerStyle } from './Grid';


export const StyledSingleRecord = styled.section`
	position: relative;

	&:nth-of-type(2n) {
		background: ${colors.backgroundMain};
		padding: 20px 20px 20px 0;
	}
`;

export const Subform = styled.section`
	margin: 30px 0;
	padding: 0 20px;
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	border-left: 10px solid ${colors.backgroundMainAccent};
	position: relative;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.4);

	.fcn {
		text-align: right;

		button + button {
			margin-left: 15px;
		}
	}

	&.subform-list section {
		border-left: 10px solid ${colors.accentPrimary};
		border-radius: 5px;
		margin: 20px 0;

		&:first-of-type {
			margin-top: 40px;
		}

		&:nth-of-type(2n) {
			border-color: ${colors.accentPrimaryLight};
		}
	}
`;

export const SubformHeader = styled.header`
	${GridContainerStyle}
	margin-top: 20px;
	align-items: center;

	h2 {
		margin-bottom: 0;
	}
`;
