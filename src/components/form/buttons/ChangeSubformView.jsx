import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

import { SUBFORM_VIEW_TABBED, SUBFORM_VIEW_LIST, SUBFORM_VIEW_STACKED, SUBFORM_VIEW_TABBED_VERTICAL } from '../../../freestone/schemaProps';

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

export default class ChangeSubformView extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		currentViewType: PropTypes.string,
		setSubformViewType: PropTypes.func,
	};


	setType = () => {
		const toggled = cycle(this.props.currentViewType);
		this.props.setSubformViewType(this.props.tableId, toggled.key);

	};

	render() {
		const toggled = cycle(this.props.currentViewType);
		return <Button onClick={this.setType} small="true" round="true" bordered="true"><Icon icon={toggled.icon} side="left" />{toggled.label}</Button>;
	}
}
