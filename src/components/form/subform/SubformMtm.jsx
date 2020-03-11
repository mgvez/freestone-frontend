import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormHeaderContent from '../../header/FormHeaderContent';
import Collapsable from '../../animation/Collapsable';
import ToggleCollapse from '../buttons/ToggleCollapse';
import { Subform, SubformHeader } from '../../../styles/Form';
import { CheckboxContainer } from '../../../styles/Input';
import { GridItem, GridContainer } from '../../../styles/Grid';
import { Heading3 } from '../../../styles/Texts';


const MtmGroup = styled.div`
	padding-top: 30px;
	padding-bottom: 30px;
	border-top: 1px solid rgba(0,0,0,0.05);

	&:first-child {
		border-top: none;
	}
`;
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

	componentDidUpdate() {
		this.requireData(this.props);
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
					<GridItem columns="3" key={`opt_${id}`}>
						<CheckboxContainer>
							<input type="checkbox" id={`${this.props.table.id}_mtm_${id}`} value={id} checked={checked} onChange={this.toggleValue} />
							<label htmlFor={`${this.props.table.id}_mtm_${id}`}>{display}</label>
						</CheckboxContainer>
					</GridItem>
				);
			});

			const nOptions = inputs.length;

			let categLabel;
			if (categ) {
				categLabel = <Heading3>{categ} <span>({nChecked} / {nOptions})</span></Heading3>;
			}

			return (<MtmGroup key={groupIndex}>
				{categLabel}
				<GridContainer>
					{inputs}
				</GridContainer>
			</MtmGroup>);

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
				<Subform>
					<SubformHeader className="row">
						<GridItem columns="8">
							<FormHeaderContent table={this.props.table} titleOverride={this.props.titleOverride} descriptionAppend={this.props.descriptionAppend} />
						</GridItem>
						<GridItem columns="4" align="end" className="fcn">
							<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
						</GridItem>

					</SubformHeader>

					<Collapsable isCollapsed={this.props.isCollapsed}>{options}</Collapsable>

				</Subform>
			);
		}

		return null;

	}
}
