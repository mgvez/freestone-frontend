
import React from 'react';
import PropTypes from 'prop-types';
import { Heading1 } from '../../../styles/Texts';
import AnimatedHeight from '../../animation/AnimatedHeight';

const TableInfo = ({
	isLight,
	table,	
}) => {
	return (
		<React.Fragment>
			<Heading1>{table.displayLabel}</Heading1>
			<AnimatedHeight isOpen={!isLight}>
				<div dangerouslySetInnerHTML={{ __html: table.help }} />
			</AnimatedHeight>
		</React.Fragment>
	);
};

TableInfo.propTypes = {
	isLight: PropTypes.bool,
	table: PropTypes.object,
};

export default TableInfo;
