import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';

export default class ToggleCollapse extends Component {
	static propTypes = {
		isCollapsed: PropTypes.bool,
		toggle: PropTypes.func,
	};

	render() {
		const toggleLabel = this.props.isCollapsed ? <span><i className="fa fa-eye"></i> Show</span> : <span><i className="fa fa-eye-slash"></i> Hide</span>;
		return <Button small round bordered onClick={this.props.toggle}>{toggleLabel}</Button>;
		// return <button onClick={this.deleteRecord} className="button-circle-danger-small"><i className="fa fa-remove"></i></button>;
	}
}
