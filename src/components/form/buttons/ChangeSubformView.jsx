import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

import { SUBFORM_VIEW_TABBED, SUBFORM_VIEW_LIST } from '../../../freestone/SchemaProps';

export default class ChangeSubformView extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		currentViewType: PropTypes.string,
		setSubformViewType: PropTypes.func,
	};

	setType = () => {
		const toggled = this.props.currentViewType === SUBFORM_VIEW_LIST ? SUBFORM_VIEW_TABBED : SUBFORM_VIEW_LIST;
		this.props.setSubformViewType(this.props.tableId, toggled);

	};

	render() {
		// console.log(this.props.currentViewType, this.props.tableId);
		const label = this.props.currentViewType === SUBFORM_VIEW_LIST ? 'View tabbed' : 'View as list';
		const icon = this.props.currentViewType === SUBFORM_VIEW_LIST ? 'columns' : 'list';
		return <Button onClick={this.setType} small round bordered><Icon icon={icon} side="left" />{label}</Button>;

	}
}
