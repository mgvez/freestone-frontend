import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		fetchForeignOptions: PropTypes.func,
		foreignOptions: PropTypes.object,

		field: PropTypes.object,
		val: PropTypes.any,

	};

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		// const { foreignOptions } = props;
		if (!props.foreignOptions) this.props.fetchForeignOptions(props.field.id);
	}
	
	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.foreignOptions);
		let options;
		if (this.props.foreignOptions) {
			options = this.props.foreignOptions.values.map((option, idx) => {
				return (
					<option key={idx} value={option.value}>
						{option.label}
					</option>
				);
			});
		}

		return (
			<select value={this.props.val} onChange={this.props.changeVal}>
				{options}
			</select>
		);
	}
}
