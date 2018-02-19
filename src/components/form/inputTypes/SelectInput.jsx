import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

export default class SelectInput extends Input {
	static propTypes = {
		foreignOptions: PropTypes.object,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
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
			<select value={this.props.val} onChange={this.changeVal}>
				{options}
			</select>
		);
	}
}
