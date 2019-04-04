import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormHeaderContent from '../../header/FormHeaderContent';
import Collapsable from '../../animation/Collapsable';
import ToggleCollapse from '../buttons/ToggleCollapse';

export default class SubformMtm extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		table: PropTypes.object,
		records: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		mtmOptions: PropTypes.array,
		isCollapsed: PropTypes.bool,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,

		fetchTable: PropTypes.func,
		fetchMtmOptions: PropTypes.func,
		fetchMtmRecords: PropTypes.func,
		toggleMtm: PropTypes.func,
		
		changeCollapsedState: PropTypes.func,
	};
	
	componentDidMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	getOptions() {

		return this.props.mtmOptions.map((optionGroup, groupIndex) => {
			// console.log(optionGroup);
			const { categ, options } = optionGroup;

			const nChecked = options.reduce((n, option) => {
				const { id } = option;
				const checked = this.props.records && !!this.props.records.find(r => r === id);
				if (checked) return n + 1;
				return n;
			}, 0);
			
			const inputs = options.map((option) => {
				const { display, id } = option;
				const checked = (this.props.records || false) && !!this.props.records.find(r => r === id);
				// console.log(this.props.tableId, id, checked);
				return (
					<div className="checkbox-container col-md-3" key={`opt_${id}`}>
						<input type="checkbox" id={`${this.props.table.id}_mtm_${id}`} value={id} checked={checked} onChange={this.toggleValue} />
						<label htmlFor={`${this.props.table.id}_mtm_${id}`}>{display}</label>
					</div>
				);
			});

			const nOptions = inputs.length;

			let categLabel;
			if (categ) {
				categLabel = <h3 className="mtm-category col-md-12">{categ} <span>({nChecked} / {nOptions})</span></h3>;
			}

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
							<FormHeaderContent table={this.props.table} titleOverride={this.props.titleOverride} descriptionAppend={this.props.descriptionAppend} />
						</div>
						<div className="col-md-3 col-md-offset-1 fcn">
							<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
						</div>
					</header>
					<div className="row">
						<Collapsable isCollapsed={this.props.isCollapsed}>{options}</Collapsable>
					</div>
				</section>
			);
		}

		return null;

	}
}
