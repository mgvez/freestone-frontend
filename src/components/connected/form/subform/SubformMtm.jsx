import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTable } from '../../../../actions/schema';
import { fetchMtmOptions, fetchMtmRecords, toggleMtm } from '../../../../actions/record';

import { formMtmMapStateToProps } from '../../../../selectors/formMtm';

import { Header } from '../../../static/form/Header';
import { ToggleSubform } from '../buttons/ToggleSubform';
import { CollapsableForm } from '../../../static/form/subform/CollapsableForm';

@connect(
	formMtmMapStateToProps,
	dispatch => bindActionCreators({ fetchMtmOptions, fetchMtmRecords, toggleMtm, fetchTable }, dispatch)
)
export class SubformMtm extends CollapsableForm {
	static propTypes = {
		tableId: React.PropTypes.number,
		table: React.PropTypes.object,
		records: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		mtmOptions: React.PropTypes.array,
		isCollapsed: React.PropTypes.bool,

		fetchTable: React.PropTypes.func,
		fetchMtmOptions: React.PropTypes.func,
		fetchMtmRecords: React.PropTypes.func,
		toggleMtm: React.PropTypes.func,
		
		setSubformCollapsed: React.PropTypes.func,
		onRequestToggleCollapse: React.PropTypes.func,
	};
	
	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	getOptions() {
		if (!this.collapser.getOpenState()) return null;

		return this.props.mtmOptions.map((optionGroup, groupIndex) => {
			// console.log(optionGroup);
			const { categ, options } = optionGroup;
			let categLabel;
			if (categ) {
				categLabel = <h3 className="mtm-category col-md-12">{categ}</h3>;
			}
			const inputs = options.map((option) => {
				const { display, id } = option;
				const checked = this.props.records && !!this.props.records.find(r => r === id);
				return (
					<div className="checkbox-container col-md-3" key={`opt_${id}`}>
						<input type="checkbox" id={`${this.props.table.id}_mtm_${id}`} value={id} checked={checked} onChange={this.toggleValue} />
						<label htmlFor={`${this.props.table.id}_mtm_${id}`}>{display}</label>
					</div>
				);
			});

			return (<div className="col-md-12 mtm-group" key={groupIndex}>
				<div className="row">
					{categLabel}
				</div>
				<div className="row">
					{inputs}
				</div>
			</div>);

		});
	}

	requireData(props) {
		// console.log(props.records);
		const { tableId, parentRecordId, parentTableId } = props;
		if (!props.table) {
			this.props.fetchTable(tableId);
		} else {
			const tableName = props.table.name;
			if (!props.mtmOptions) this.props.fetchMtmOptions(tableName);
			if (!props.records) this.props.fetchMtmRecords(tableName, parentRecordId, parentTableId);

		}
	}

	toggleValue = (e) => {
		const v = (e && e.target) ? e.target.value : false;
		this.props.toggleMtm(this.props.tableId, this.props.parentTableId, this.props.parentRecordId, v);
	};

	render() {
		// console.log(this.props.records);
		if (this.props.mtmOptions) {
			// console.log(this.props.mtmOptions);
			const options = this.getOptions();
			return (
				<section className="subform">
					<header className="row">
						<div className="col-md-8">
							<Header table={this.props.table} />
						</div>
						<div className="col-md-3 col-md-offset-1 fcn">
							<ToggleSubform isCollapsed={this.props.isCollapsed} tableId={this.props.table.id} toggle={this.collapser.toggle} />
						</div>
					</header>
					<div className="row" ref={this.setCollapsable}>
						{options}
					</div>
				</section>
			);
		}

		return null;

	}
}
