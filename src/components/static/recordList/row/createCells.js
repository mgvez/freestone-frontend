import React from 'react';

import { PRIKEY_ALIAS, TYPE_IMG, TYPE_FILE, TYPE_BANKIMG, ROLE_N_USES } from 'freestone/schemaProps';
import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { BankImgThumbnail } from 'components/connected/fileThumbnail/BankImgThumbnail';
import { BankNUses } from 'components/connected/widgets/BankNUses';

const MAX_THUMB_SIZE = 200;


export function createCells(table, fields, values, elementType = 'td', options = {}) {
	return fields.map((field, index) => {
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

		if (field.role === ROLE_N_USES) {
			// console.log(field);
			// console.log(values);
			val = React.createElement(
				BankNUses,
				{
					bankName: table.bankName,
					id: values[PRIKEY_ALIAS],
					nUses: val,
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
