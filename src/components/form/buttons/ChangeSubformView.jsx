import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
		const className = this.props.currentViewType === SUBFORM_VIEW_LIST ? 'file-text' : 'list';
		return <button onClick={this.setType} className="button-round-action-bordered change-subform-view"><i className={`fa fa-${className}`}></i>{label}</button>;

	}
}
