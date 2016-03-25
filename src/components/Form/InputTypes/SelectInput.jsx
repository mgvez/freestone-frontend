import React from 'react';

import { Input } from 'components/Form/InputTypes/Input';
import { RequireApiData } from 'utils/RequireApiData';


export class SelectInput extends Input {
	static propTypes = {
		foreignOptions: React.PropTypes.object,
	};
	
	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// const { foreignOptions } = props;
		this.requireDataCtrl.requireProp('foreignOptions', props, this.props.fetchForeignOptions, [props.field.id]);
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
