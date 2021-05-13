import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RecordSlug({
	tableId,
	recordId,
	record,	
	fetchSlug,
	slugs,
}) {
	if (!tableId) return null;

	useEffect(() => {
		console.log(record);
		if (record) {
			fetchSlug(tableId, recordId, record).then(res => {
				console.log(res);	
			});
		}
	}, [tableId, recordId, record]);

	
	return (
		<div>
			<div>{`record ${tableId}.${recordId}`}</div>
			{slugs && Object.entries(slugs).map(([lang, slug]) => {
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
	slugs: PropTypes.object,
	record: PropTypes.object,
	fetchSlug: PropTypes.func,
};
