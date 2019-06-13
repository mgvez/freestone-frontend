
import styled, { css } from 'styled-components';
import colors from './Colors';

export function getActionCss(props) {
	return css`

		display: block;
		padding: 5px 10px;

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
				color: ${colors.red58};
			}
		`}
		
		${props.accent && `
			i {
				color: ${colors.accentPrimary};
			}
		`}

		${props.warn && `
			i {
				color: ${colors.yellow76};
			}
		`}
	`;
}

export const RecordAction = styled.div`${props => getActionCss(props)}`;
