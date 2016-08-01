import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';


export class SelectInput extends Input {
	static propTypes = {
		foreignOptions: React.PropTypes.object,
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
