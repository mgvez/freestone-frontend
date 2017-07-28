import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { TYPE_DATETIME } from '../../../freestone/schemaProps';
import { Input } from './Input';

export class DateInput extends Input {

	onSelectDate = (d) => {
		// console.log(a);
		let dateStr = '';
		if (d) {
			dateStr = d.format('YYYY-MM-DD');

			if (this.props.field.type === TYPE_DATETIME) {
				d.hour(Number(this._hour.value));
				d.minute(Number(this._minute.value));
				d.second(Number(this._second.value));
				dateStr = d.format('YYYY-MM-DD HH:mm:ss');
			}

		}
		this.changeVal(dateStr);
	};

	onChangeTime = () => {
		this.onSelectDate(moment(this.props.val));
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		const d = (this.props.val && !~this.props.val.indexOf('0000-00-00')) ? moment(this.props.val) : null;
		// console.log('moment', this.props.val, d);

		let timeInputs;
		if (this.props.field.type === TYPE_DATETIME) {
			timeInputs = (<div>
				<input ref={el => this._hour = el} value={d && d.hour()} onChange={this.onChangeTime} /> h
				<input ref={el => this._minute = el} value={d && d.minute()} onChange={this.onChangeTime} /> m
				<input ref={el => this._second = el} value={d && d.second()} onChange={this.onChangeTime} /> s
			</div>);
		}

		return (<div>
			<DatePicker selected={d} locale="fr-CA" showYearDropdown onChange={this.onSelectDate} />
			{timeInputs}
		</div>);
	}
}
