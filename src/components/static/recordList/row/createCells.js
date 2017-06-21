import React from 'react';

import { PRIKEY_ALIAS, TYPE_IMG, TYPE_FILE, TYPE_BANKIMG, TYPE_BOOL, ROLE_N_USES, TYPE_ISPUBLISHED } from '../../../../freestone/schemaProps';
import { FileThumbnail } from '../../../connected/fileThumbnail/FileThumbnail';
import { BankImgThumbnail } from '../../../connected/fileThumbnail/BankImgThumbnail';
import { BankNUses } from '../../../connected/widgets/BankNUses';
import { BoolSwitch } from '../../../connected/recordList/BoolSwitch';

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
