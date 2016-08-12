import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSubformViewType } from 'actions/subform';
import { subformViewSelector } from 'selectors/subformView';

import { SUBFORM_VIEW_TABBED, SUBFORM_VIEW_LIST } from 'freestone/schemaProps';

@connect(
	subformViewSelector,
	dispatch => bindActionCreators({ setSubformViewType }, dispatch)
)
export class ChangeSubformView extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		currentViewType: React.PropTypes.string,
		setSubformViewType: React.PropTypes.func,
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
