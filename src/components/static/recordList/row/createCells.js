import React from 'react';

import { TYPE_IMG, TYPE_FILE, TYPE_BANKIMG } from 'freestone/schemaProps';
import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { BankImgThumbnail } from 'components/connected/fileThumbnail/BankImgThumbnail';

const MAX_THUMB_SIZE = 200;


export function createCells(fields, values, elementType = 'td', options = {}) {
	return fields.map((field, index) => {
		// console.log(field.listAlias);
		if (field.isGroup) return null;

		let val = values[field.listAlias];
		// if (!val) {
		// 	return null;
		// }
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
		if (field.type === TYPE_BANKIMG) {
			val = React.createElement(
				BankImgThumbnail,
				{
					id: values[field.listAlias],
					maxSize: MAX_THUMB_SIZE,
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
