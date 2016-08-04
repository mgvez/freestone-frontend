import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { formCollapsedMapStateToProps } from 'selectors/formCollapsed';
import { setSubformCollapsed } from 'actions/subform';

@connect(
	formCollapsedMapStateToProps,
	dispatch => bindActionCreators({ setSubformCollapsed }, dispatch)
)
export class ToggleSubform extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		isCollapsed: React.PropTypes.bool,
		toggle: React.PropTypes.func,
	};

	render() {
		const toggleLabel = this.props.isCollapsed ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>;
		return <a className="button-round button-hide-show" onClick={this.props.toggle}>{toggleLabel}</a>;
		// return <button onClick={this.deleteRecord} className="button-circle-danger-small"><i className="fa fa-remove"></i></button>;
	}
}
