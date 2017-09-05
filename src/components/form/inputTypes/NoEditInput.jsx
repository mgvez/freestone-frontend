import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchForeignLabel } from '../../../actions/foreignOptions';
import { foreignUneditableMapStateToProps } from '../../../selectors/foreignOptions';

import { Input } from './Input';

@connect(
	foreignUneditableMapStateToProps,
	dispatch => bindActionCreators({ fetchForeignLabel }, dispatch)	
)
export class NoEditInput extends Input {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		//if from foreign foreign
		label: PropTypes.string,

		fetchForeignLabel: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	requireData(props) {
		if (props.field.foreign && props.label === null && props.val && props.val !== '0') {
			this.props.fetchForeignLabel(props.field.id, props.val);
		}
	}

	render() {
		// console.log(`render input ${this.props.field.name}`);
		const val = this.props.label || this.props.val;
		
		return (
			<span>{val}</span>
		);
	}
}
