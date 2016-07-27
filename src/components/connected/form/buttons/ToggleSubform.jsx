import React, { Component } from 'react';

export class ToggleSubform extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		isCollapsed: React.PropTypes.bool,
		onRequestToggleCollapse: React.PropTypes.func,
	};	

	render() {
		const toggleLabel = this.props.isCollapsed ? 'show' : 'hide';
		return <a className="button-round" onClick={this.props.onRequestToggleCollapse}>{ toggleLabel }</a>;
		// return <button onClick={this.deleteRecord} className="button-circle-danger-small"><i className="fa fa-remove"></i></button>;
	}
}
