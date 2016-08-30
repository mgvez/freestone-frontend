import React from 'react';

import { TYPE_IMG, TYPE_FILE } from 'freestone/schemaProps';
import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';

export function createCells(fields, values, elementType = 'td', options = {}) {
	return fields.map((field, index) => {
		// console.log(field.listAlias);
		if (field.isGroup) return null;

		let val = values[field.listAlias];
		if (!val) {
			return null;
		}
		if (field.type === TYPE_IMG || field.type === TYPE_FILE) {
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
	}).filter(el => el);
}
