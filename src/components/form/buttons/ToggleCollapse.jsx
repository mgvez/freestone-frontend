import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ToggleCollapse extends Component {
	static propTypes = {
		isActive: PropTypes.bool,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	}

	render() {
		let className = 'tab-list-item';

		if (this.props.isActive === this.props.label) {
			className += ' tab-list-active';
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
