import React from 'react';

import { PRIKEY_ALIAS, TYPE_IMG, TYPE_FILE, TYPE_BANKIMG, TYPE_BOOL, TYPE_ISPUBLISHED, LABEL_PSEUDOFIELD_ALIAS, BANK_PATH_ALIAS, BANK_THUMB_ALIAS } from '../../../freestone/schemaProps';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import BoolSwitch from '../../../containers/recordList/BoolSwitch';

const MAX_THUMB_SIZE = 200;

export function getFieldElements(table, fields, values, elementType = 'td', options = {}) {
	if (fields.length === 0) {
		// console.log(values);
		return React.createElement(
			elementType,
			{
				key: 'v_0',
				'data-field-label': '',
				...options,
			},
			values[LABEL_PSEUDOFIELD_ALIAS]
		);
	}
	// console.log(values);

	return fields.map((field) => {
		if (field.isGroup || field.type === 'order') return null;

		let val = values[field.listAlias];
		// if (!val) {
		// 	return null;
		// }
		if (field.type === TYPE_IMG || field.type === TYPE_FILE) {
			val = React.createElement(
				FileThumbnail,
				{
					val: values[field.listAlias],
					absolutePath: values[field.listAlias + BANK_PATH_ALIAS],
					thumbnailPath: values[field.listAlias + BANK_THUMB_ALIAS],
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
		
		if (field.type === TYPE_BOOL || field.type === TYPE_ISPUBLISHED) {
			// console.log(values);
			// console.log(values[PRIKEY_ALIAS]);
			val = React.createElement(
				BoolSwitch,
				{
					field,
					val: values[field.listAlias],
					recordId: values[PRIKEY_ALIAS],
				}
			);
		}

		return React.createElement(
			elementType,
			{
				key: `val_${field.id}`,
				'data-field-label': field.label,
				...options,
			},
			val
		);
	}).filter(el => el);
}
