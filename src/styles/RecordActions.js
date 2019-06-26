
import styled, { css } from 'styled-components';
import colors from './Colors';

export function getActionCss(props) {
	return css`

		display: block;
		padding: 10px 10px;

		text-decoration: none;
		color: ${colors.textPrimary};
		cursor: pointer;

		&:hover {
			background: rgba(0,0,0,0.05);
			text-decoration: none;
		}

		i {
			margin-right: 10px;
			width: 20px;
			text-align: center;
		}

		${props.danger && `
			i {
				color: ${colors.dangerPrimary};
			}
		`}
		
		${props.accent && `
			i {
				color: ${colors.accentPrimary};
			}
		`}

		${props.warn && `
			i {
				color: ${colors.warnPrimary};
			}
		`}
	`;
}

export const RecordAction = styled.div`${props => getActionCss(props)}`;
