import React from 'react';

import { PRIKEY_ALIAS, TYPE_IMG, TYPE_FILE, TYPE_BANKIMG, TYPE_BOOL, TYPE_ISPUBLISHED, LABEL_PSEUDOFIELD_ALIAS, BANK_PATH_ALIAS, BANK_THUMB_ALIAS } from '../../../freestone/schemaProps';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import BoolSwitch from '../../../containers/recordList/BoolSwitch';
import QuickeditField from '../../../containers/recordList/standard/QuickeditField';

const MAX_THUMB_SIZE = 100;

export function getFieldElements(table, fields, values, isQuickEdit, elementType = 'td', options = {}) {
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
	return fields.map((field) => {
		if (field.isGroup || field.type === 'order') return null;
		let val = values[field.listAlias];
		
		let maxWidth;
		if (field.type === TYPE_IMG || field.type === TYPE_FILE) {
			val = (
				<FileThumbnail
					val={values[field.listAlias]}
					absolutePath={values[field.listAlias + BANK_PATH_ALIAS]}
					thumbnailPath={values[field.listAlias + BANK_THUMB_ALIAS]}
					maxSize={MAX_THUMB_SIZE}
					dir={field.folder}
					type={field.type}
				/>
			);
			maxWidth = `${MAX_THUMB_SIZE}px`;
		} else if (field.type === TYPE_BANKIMG) {
			val = (
				<BankImgThumbnail
					id={values[field.listAlias]}
					maxSize={MAX_THUMB_SIZE}
				/>
			);
		} else if (field.type === TYPE_BOOL || field.type === TYPE_ISPUBLISHED) {
			val = (
				<BoolSwitch
					field={field}
					val={values[field.listAlias]}
					recordId={values[PRIKEY_ALIAS]}
				/>
			);
		} else if (isQuickEdit) {
			// for foreign fields, we need the true database value when editing, not the list display value which is the display of the foreign
			if (field.foreign) {
				val = values[field.alias];
			}
			val = <QuickeditField recordId={values[PRIKEY_ALIAS]} val={val} table={table} field={field} />;
		}

		const attr = { 
			...options,
			style: {
				...(options.style || {}),
				maxWidth,
			},
		};

		return React.createElement(
			elementType,
			{
				key: `val_${field.id}}`,
				'data-field-label': field.label,
				...attr,
			},
			val
		);
	}).filter(el => el);
}
