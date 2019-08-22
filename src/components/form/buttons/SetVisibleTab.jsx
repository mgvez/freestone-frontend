import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SetVisibleTab extends Component {
	static propTypes = {
		isActive: PropTypes.bool,
		key: PropTypes.string,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	}

	render() {
		let className = 'tab tab-list-item';
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
