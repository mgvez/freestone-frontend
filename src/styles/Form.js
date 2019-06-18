
import styled, { css } from 'styled-components';
import colors from './Colors';
import { darken, lighten } from './Utils';


export const StyledSingleRecord = styled.section`
	position: relative;

	&:nth-of-type(2n) {
		background: ${colors.backgroundMainAccent};

		&:before {
			content: ' ';
			position: absolute;
				top: 0;
				left: 50%;

			background: ${colors.backgroundMainAccent};
			transform: translate(-50%, 0);
			width: 10000px;
			height: 100%;
		}

	}
`;

export const Subform = styled.section`
	margin-bottom: 30px;
	margin-top: 30px;
	padding-left: 30px;
	padding-right: 10px;
	border-top: 1px solid ${colors.backgroundMainAccent};
	border-bottom: 1px solid ${colors.backgroundMainAccent};
	border-left: 10px solid ${colors.backgroundMainAccent};
	position: relative;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.4);

	.fcn {
		text-align: right;

		button {
			margin-bottom: 15px;
		}

		button + button {
			margin-left: 15px;
		}
	}
`;

export const SubformHeader = styled.header`
	margin-top: 20px;
	padding-top: 10px;
`;
