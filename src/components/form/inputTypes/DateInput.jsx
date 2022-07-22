import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { TYPE_DATETIME } from '../../../freestone/schemaProps';

export default class DateInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
	};

	onSelectDate = (dateNative) => {
		const dateMoment = moment(dateNative);
		const dateStr = dateMoment.format('YYYY-MM-DD HH:mm:ss');
		this.props.changeVal(dateStr);
	};

	render() {
		let dateNative = null;
		if (this.props.val && !~this.props.val.indexOf('0000-00-00')) {
			const dateMoment = moment(this.props.val);
			if (dateMoment.isValid()) {
				dateNative = dateMoment.toDate();
			}
		}

		return (<div>
			<DatePicker 
				selected={dateNative}
				showYearDropdown
				dateFormat="yyyy-MM-dd HH:mm:ss"
				onChange={this.onSelectDate}
				showTimeSelect={this.props.field.type === TYPE_DATETIME}
			/>
		</div>);
	}
}
