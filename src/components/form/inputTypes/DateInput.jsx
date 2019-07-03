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

	// onChangeTime = () => {
	// 	this.onSelectDate(this.props.val);
	// };

	render() {
		// console.log(`render input ${this.props.field.name}`);
		
		// console.log(val);

		// let timeInputs;
		// if (this.props.field.type === TYPE_DATETIME) {
		// 	timeInputs = (<div>
		// 		<input ref={el => this._hour = el} value={d && d.hour()} onChange={this.onChangeTime} placeholder="HH" size="2" /> h 
		// 		<input ref={el => this._minute = el} value={d && d.minute()} onChange={this.onChangeTime} placeholder="MM" size="2" /> m 
		// 		<input ref={el => this._second = el} value={d && d.second()} onChange={this.onChangeTime} placeholder="SS" size="2" /> s 
		// 	</div>);
		// }
		let dateNative = null;
		if (this.props.val && !~this.props.val.indexOf('0000-00-00')) {
			const dateMoment = moment(this.props.val);
			dateNative = dateMoment.toDate();
			// console.log(parts);
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
