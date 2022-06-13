import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';
import ChangeSubformPreviewMode from '../../../containers/form/buttons/ChangeSubformPreviewMode';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
`;

const SwitchContainer = styled.div`
	position: absolute;
	top: 102%;
	z-index: 1000;

	button {
		background: white;
		margin: 0 0 5px;
		width: 100%;
		text-align: left;
		border-radius: 0;
		border-bottom: 0;
	}
`;

import { 
	SUBFORM_VIEW_TABBED,
	SUBFORM_VIEW_LIST,
	SUBFORM_VIEW_STACKED,
	SUBFORM_VIEW_TABBED_VERTICAL,
	SUBFORM_PREVIEW_MODE_PREVIEWS,
} from '../../../freestone/schemaProps';


const allViews = {
	[SUBFORM_VIEW_STACKED]: {
		key: SUBFORM_VIEW_STACKED,
		label: 'Stack',
		icon: 'bars',
	},
	[SUBFORM_VIEW_LIST]: {
		key: SUBFORM_VIEW_LIST,
		label: 'All open',
		icon: 'server',
	},
	[SUBFORM_VIEW_TABBED]: {
		key: SUBFORM_VIEW_TABBED,
		label: 'Tabbed',
		icon: 'caret-down',

	},
	[SUBFORM_VIEW_TABBED_VERTICAL]: {
		key: SUBFORM_VIEW_TABBED_VERTICAL,
		label: 'Sidetabs',
		icon: 'caret-right',
	},
};

export default function ChangeSubformView(props) {

	const [isOpen, setIsOpen] = useState(false);

	const currentDef = allViews[props.currentViewType] || allViews.stacked;

	let previewBtn;
	let hasChangeViewButton = true;
	if (props.isContentBlockPreviewable) {
		previewBtn = <ChangeSubformPreviewMode tableId={props.tableId} />;
		hasChangeViewButton = props.previewMode !== SUBFORM_PREVIEW_MODE_PREVIEWS;
	}

	const allButtons = isOpen && (
		<SwitchContainer>
			{Object.values(allViews).map(view => {
				const onClick = () => {
					props.setSubformViewType(props.tableId, view.key);
					setIsOpen(false);
				};
				return (
					<Button key={view.key} onClick={onClick} small="true" round="true" bordered="true">
						<Icon icon={view.icon} side="left" />{view.label}
					</Button>
				);
			})}
		</SwitchContainer>
	);
	return (
		<React.Fragment>
			{hasChangeViewButton && (
				<Container>
					<Button onClick={() => setIsOpen(!isOpen)} small="true" round="true" bordered="true"><Icon icon={currentDef.icon} side="left" />Layout</Button>
					{allButtons}
				</Container>
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
