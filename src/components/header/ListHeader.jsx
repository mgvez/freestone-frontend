import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cssVars from '../../styles/Variables';
import { Header, HeaderTexts, HeaderFcn, headerMarginBottom } from '../../styles/Header';
import { Heading1 } from '../../styles/Texts';

import ProdEnvWarning from '../widgets/ProdEnvWarning';

export default function ListHeader(props) {
	
	const headerRef = useRef();

	useEffect(() => {
		if (props.reportDimensions) {
			const rect = headerRef.current.getBoundingClientRect();
			props.reportDimensions(rect.width, rect.height, { bottom: headerMarginBottom });
		}
	}, []);
	

	const { 
		table,
		isLight,
		buttons,
	} = props;
	

	const classList = [];
	if (isLight) classList.push('light');

	const info = isLight ? null : (
		<React.Fragment>
			<Heading1>{table.displayLabel}</Heading1>
			<p dangerouslySetInnerHTML={{ __html: table.help }} />
		</React.Fragment>
	);

	return (
		<Header className={classList.join(' ')} ref={headerRef}>
			<HeaderTexts columns="8">
				{info}
			</HeaderTexts>
			<HeaderFcn columns="4" offset="9" justify="end" align="end">
				{buttons}
			</HeaderFcn>
		</Header>
	);

}

ListHeader.propTypes = {
	isGod: PropTypes.bool,
	table: PropTypes.object,
	isLight: PropTypes.bool,
	isProdEnv: PropTypes.bool,
	buttons: PropTypes.any,
	children: PropTypes.any,
	reportDimensions: PropTypes.func,
};
