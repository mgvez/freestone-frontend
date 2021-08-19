import React, { Component } from 'react';
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
	case SUBFORM_PREVIEW_MODE_PREVIEWS:
		return {
			key: SUBFORM_PREVIEW_MODE_MIXED,
			label: 'View all open',
			icon: 'server',
		};
	case SUBFORM_PREVIEW_MODE_MIXED:
	default:
		return {
			key: SUBFORM_PREVIEW_MODE_EDIT,
			label: 'View as stack',
			icon: 'bars',
		};
	}
}

export default function ChangeSubformView(props) {

	const setType = () => {
		const toggled = cycle(props.currentPreviewMode);
		props.setSubformPreviewMode(props.tableId, toggled.key);
	};


	const toggled = cycle(props.currentPreviewMode);
	return <Button onClick={setType} small="true" round="true" bordered="true"><Icon icon={toggled.icon} side="left" />{toggled.label}</Button>;

}

ChangeSubformView.propTypes = {
	tableId: PropTypes.number,
	currentPreviewMode: PropTypes.string,
	setSubformPreviewMode: PropTypes.func,
};
