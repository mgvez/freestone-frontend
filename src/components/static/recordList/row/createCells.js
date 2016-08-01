import React from 'react';

import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';

export function createCells(fields, values, elementType = 'td', options = {}) {
	return fields.map((field, index) => {
		let val = values[field.listAlias];
		if (field.type === 'img' || field.type === 'file') {
			val = React.createElement(
				FileThumbnail,
				{
					val: values[field.listAlias],
					dir: field.folder,
					type: field.type,
				}
			);
		}
		return React.createElement(
			elementType,
			{
				key: index,
				'data-field-label': field.label,
				...options,
			},
			val
		);
	});
}
