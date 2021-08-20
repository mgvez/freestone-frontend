import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';
import ChangeSubformPreviewMode from '../../../containers/form/buttons/ChangeSubformPreviewMode';

import { 
	SUBFORM_VIEW_TABBED,
	SUBFORM_VIEW_LIST,
	SUBFORM_VIEW_STACKED,
	SUBFORM_VIEW_TABBED_VERTICAL,
	SUBFORM_PREVIEW_MODE_PREVIEWS,
} from '../../../freestone/schemaProps';

function cycle(current) {
	switch (current) {
		case SUBFORM_VIEW_STACKED:
			return {
				key: SUBFORM_VIEW_LIST,
				label: 'View all open',
				icon: 'server',
			};
		case SUBFORM_VIEW_LIST:
			return {
				key: SUBFORM_VIEW_TABBED,
				label: 'View tabbed',
				icon: 'columns',
			};
		case SUBFORM_VIEW_TABBED:
			return {
				key: SUBFORM_VIEW_TABBED_VERTICAL,
				label: 'View sidebar',
				icon: 'rows',
			};
		case SUBFORM_VIEW_TABBED_VERTICAL:
		default:
			return {
				key: SUBFORM_VIEW_STACKED,
				label: 'View as stack',
				icon: 'bars',
			};
	}
}

export default function ChangeSubformView(props) {

	const setType = () => {
		const toggled = cycle(props.currentViewType);
		props.setSubformViewType(props.tableId, toggled.key);
	};


	const toggled = cycle(props.currentViewType);

	let previewBtn;
	let hasChangeViewButton = true;
	if (props.isContentBlockPreviewable) {
		previewBtn = <ChangeSubformPreviewMode tableId={props.tableId} />;
		hasChangeViewButton = props.previewMode !== SUBFORM_PREVIEW_MODE_PREVIEWS;
	}

	return (
		<React.Fragment>
			{hasChangeViewButton && (
				<Button onClick={setType} small="true" round="true" bordered="true"><Icon icon={toggled.icon} side="left" />{toggled.label}</Button>
			)}
			{previewBtn}
		</React.Fragment>
	);

}

ChangeSubformView.propTypes = {
	tableId: PropTypes.number,
	currentViewType: PropTypes.string,
	previewMode: PropTypes.string,
	setSubformViewType: PropTypes.func,
	isContentBlockPreviewable: PropTypes.bool,
};
