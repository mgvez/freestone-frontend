import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ToggleCollapse extends Component {
	static propTypes = {
		isCollapsed: PropTypes.bool,
		toggle: PropTypes.func,
	};

	render() {
		const toggleLabel = this.props.isCollapsed ? <span><i className="fa fa-eye"></i> Show</span> : <span><i className="fa fa-eye-slash"></i> Hide</span>;
		return <a className="button-round-action-bordered button-hide-show" onClick={this.props.toggle}>{toggleLabel}</a>;
		// return <button onClick={this.deleteRecord} className="button-circle-danger-small"><i className="fa fa-remove"></i></button>;
	}
}
