import React from 'react';

import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from './Colors';

const StyledEm = styled.em`
	width: ${18 / 14}em;
	text-align: center;
	font-size: inherit;
	display:inline-block;
	&.cta {
		cursor:pointer;
		color: ${colors.ctaPrimary};
	}
`;

//cta

export const Icon = props => <StyledEm className={`fa icon ${props.cta && 'cta'}`}><FontAwesomeIcon icon={props.icon} /></StyledEm>; // eslint-disable-line
