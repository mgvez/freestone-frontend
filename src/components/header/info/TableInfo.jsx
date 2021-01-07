
import React from 'react';
import PropTypes from 'prop-types';
import { Heading1 } from '../../../styles/Texts';

const TableInfo = ({
	isLight,
	table,	
}) => {
	return isLight ? null : (
		<React.Fragment>
			<Heading1>{table.displayLabel}</Heading1>
			<p dangerouslySetInnerHTML={{ __html: table.help }} />
		</React.Fragment>
	);
};

TableInfo.propTypes = {
	isLight: PropTypes.bool,
	table: PropTypes.object,
};

export default TableInfo;
