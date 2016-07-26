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

		setSubformCollapsed: React.PropTypes.func,
	};

	onClickToggle = () => {
		this.props.setSubformCollapsed(this.props.tableId, !this.props.isCollapsed);
	}

	render() {
		const toggleLabel = this.props.isCollapsed ? 'show' : 'hide';
		return <a className="button-round" onClick={this.onClickToggle}>{ toggleLabel }</a>;
		// return <button onClick={this.deleteRecord} className="button-circle-danger-small"><i className="fa fa-remove"></i></button>;
	}
}
