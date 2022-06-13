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
				key: SUBFORM_PREVIEW_MODE_MIXED,
				label: 'Turn on preview',
				icon: 'desktop',
			};
		// case SUBFORM_PREVIEW_MODE_PREVIEWS:
		// 	return {
		// 		key: SUBFORM_PREVIEW_MODE_MIXED,
		// 		label: 'Switch to Side by side',
		// 		icon: 'columns',
		// 	};
		case SUBFORM_PREVIEW_MODE_MIXED:
		default:
			return {
				key: SUBFORM_PREVIEW_MODE_EDIT,
				label: 'turn off preview',
				icon: 'pen',
			};
	}
}

export default function ChangeSubformPreviewMode(props) {
	const setType = () => {
		const toggled = cycle(props.previewMode);
		props.setSubformPreviewMode(props.tableId, toggled.key);
	};


	const toggled = cycle(props.previewMode);
	return <Button onClick={setType} small="true" round="true" bordered="true" title={toggled.label}><Icon icon={toggled.icon} side="center" /></Button>;

}

ChangeSubformPreviewMode.propTypes = {
	tableId: PropTypes.number,
	previewMode: PropTypes.string,
	setSubformPreviewMode: PropTypes.func,
};
