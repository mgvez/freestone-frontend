import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

import { 
	SUBFORM_PREVIEW_MODE_PREVIEWS,
	SUBFORM_PREVIEW_MODE_MIXED,
	SUBFORM_PREVIEW_MODE_EDIT,
} from '../../../freestone/schemaProps';

function cycle(current) {
	switch (current) {
		case SUBFORM_PREVIEW_MODE_EDIT:
			return {
				key: SUBFORM_PREVIEW_MODE_PREVIEWS,
				label: 'Switch to Preview',
				icon: 'eye',
			};
		case SUBFORM_PREVIEW_MODE_PREVIEWS:
			return {
				key: SUBFORM_PREVIEW_MODE_MIXED,
				label: 'Switch to Side by side',
				icon: 'columns',
			};
		case SUBFORM_PREVIEW_MODE_MIXED:
		default:
			return {
				key: SUBFORM_PREVIEW_MODE_EDIT,
				label: 'Switch to Edit',
				icon: 'pen',
			};
	}
}

export default function ChangeSubformPreviewMode(props) {
	const setType = () => {
		const toggled = cycle(props.currentPreviewMode);
		props.setSubformPreviewMode(props.tableId, toggled.key);
	};


	const toggled = cycle(props.currentPreviewMode);
	return <Button onClick={setType} small="true" round="true" bordered="true"><Icon icon={toggled.icon} side="left" />{toggled.label}</Button>;

}

ChangeSubformPreviewMode.propTypes = {
	tableId: PropTypes.number,
	currentPreviewMode: PropTypes.string,
	setSubformPreviewMode: PropTypes.func,
};
