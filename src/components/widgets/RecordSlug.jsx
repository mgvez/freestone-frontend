import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function RecordSlug({
	tableId,
	recordId,
	record,	
	fetchWorkingSlug,
}) {
	if (!tableId) return null;

	const [workingSlugs, setWorkingSlugs] = useState();

	useEffect(() => {
		if (record) {
			fetchWorkingSlug(tableId, recordId, record).then(res => {
				if (res.slugs) {
					setWorkingSlugs(res.slugs);	
				}
			});
		}
	}, [tableId, recordId, record]);

	
	return (
		<div>
			<div>{`record ${tableId}.${recordId}`}</div>
			{workingSlugs && Object.entries(workingSlugs).map(([lang, slug]) => {
				return (
					<div key={lang}>{slug}</div>
				);
			})}
		</div>
	);

}

RecordSlug.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	fetchWorkingSlug: PropTypes.func,
};
