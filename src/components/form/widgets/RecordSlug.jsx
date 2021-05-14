import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Widget = styled.div`
	margin-top: 10px;
	line-height: 1.2em;
	font-size: 0.8em;
	border: 1px black solid;
`;

export default function RecordSlug({
	tableId,
	recordId,
	record,	
	fetchWorkingSlug,
}) {
	console.log(tableId);
	if (!tableId) return null;

	const [workingSlugs, setWorkingSlugs] = useState();

	useEffect(() => {
		if (record) {
			console.log(record);

			fetchWorkingSlug(tableId, recordId, record).then(res => {
				console.log(res);
				if (res.slugs) {
					setWorkingSlugs(res.slugs);	
				}
			});
		}
	}, [tableId, recordId, record]);

	
	return (
		<Widget>
			<div>{`SLUGS record ${tableId}.${recordId}`}</div>
			{workingSlugs && Object.entries(workingSlugs).map(([lang, slug]) => {
				return (
					<div key={lang}>{slug}</div>
				);
			})}
		</Widget>
	);

}

RecordSlug.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	fetchWorkingSlug: PropTypes.func,
};
