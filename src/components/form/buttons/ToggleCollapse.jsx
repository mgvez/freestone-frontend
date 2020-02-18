import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

export default class ToggleCollapse extends Component {
	static propTypes = {
		isCollapsed: PropTypes.bool,
		toggle: PropTypes.func,
	};

	render() {
		const toggleLabel = this.props.isCollapsed ? <span><Icon icon="eye" /> Show</span> : <span><Icon icon="eye-slash" /> Hide</span>;
		return <Button round bordered small onClick={this.props.toggle}>{toggleLabel}</Button>;
	}
}
