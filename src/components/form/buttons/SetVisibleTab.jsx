import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SetVisibleTab extends Component {
	static propTypes = {
		isActive: PropTypes.bool,
		clickKey: PropTypes.string,
		tableId: PropTypes.number,
		label: PropTypes.string.isRequired,
		showFieldGroup: PropTypes.func.isRequired,
	};

	onClick = () => {
		this.props.showFieldGroup(this.props.clickKey, this.props.tableId);
	}

	render() {
		let className = 'tab';
		if (this.props.isActive) {
			className += ' active';
		}

		return (
			<div
				className={className}
				onClick={this.onClick}
			>
				{this.props.label}
			</div>
		);
	}
}
