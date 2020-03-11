import React from 'react';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //eslint-disable-line
import colors from './Colors';

const StyledEm = styled.i`
	width: ${18 / 14}em;
	text-align: center;
	font-size: inherit;
	display:inline-block;

	button &, a & {
		&.right {
			margin-left: 5px;
		}
		&.left {
			margin-right: 5px;
		}
		&.center {
			margin: 0;
		}
	}
	
	&.cta {
		cursor:pointer;
		color: ${colors.ctaPrimary};
	}

`;

//cta
export const Icon = props => {
	const { icon } = props;// eslint-disable-line
	const { type } = props;// eslint-disable-line
	return <StyledEm className={`${type || 'fa'} fa-${icon} icon ${props.cta && 'cta'} ${props.side || 'left'}`} />; // eslint-disable-line
};
