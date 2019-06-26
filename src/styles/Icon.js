import React from 'react';

import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from './Colors';

const StyledEm = styled.i`
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
export const Icon = props => {
	const { icon } = props;// eslint-disable-line
	const { type } = props;// eslint-disable-line
	return <StyledEm className={`${type || 'fa'} fa-${icon} icon ${props.cta && 'cta'}`} />; // eslint-disable-line
};
