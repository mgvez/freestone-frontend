import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormHeaderContent from '../../header/info/FormHeaderContent';
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
		padding-top: 0px;
		border-top: none;
	}
`;
const CategoryTitle = styled.div`
	label {
		font-size: 0.8em;
		line-height: 1.4em;
	}
	.checkAll {
		display: inline-block;
		margin-left: 2em;
	}
`;
export default function SubformMtm(props) {

	const { table, tableId, records, mtmOptions, parentRecordId, parentTableId } = props;
	useEffect(() => {
		const { fetchMtmOptions, fetchMtmRecords, fetchTable } = props;
		if (!table) {
			fetchTable(tableId);
		} else {
			if (!mtmOptions) fetchMtmOptions(table.name);
			if (!records) fetchMtmRecords(table.name, parentRecordId, parentTableId);

		}
	});

	const toggleValue = (e) => {
		const v = (e && e.target) ? e.target.value : false;
		props.toggleMtm(tableId, parentTableId, parentRecordId, v);
	};


	const getOptions = () => {

		return mtmOptions.map((optionGroup, groupIndex) => {
			// console.log(optionGroup);
			const { categ, options } = optionGroup;

			const nChecked = options.reduce((n, option) => {
				const { id } = option;
				const checked = records && !!records.find(r => r === id);
				if (checked) return n + 1;
				return n;
			}, 0);
			
			const inputs = options.map((option) => {
				const { display, id } = option;
				const checked = (records || false) && !!records.find(r => r === id);
				// console.log(tableId, id, checked);
				return (
					<GridItem columns="3" key={`opt_${id}`}>
						<CheckboxContainer>
							<input type="checkbox" id={`${table.id}_mtm_${id}`} value={id} checked={checked} onChange={toggleValue} />
							<label htmlFor={`${table.id}_mtm_${id}`}>{display}</label>
						</CheckboxContainer>
					</GridItem>
				);
			});

			const nOptions = inputs.length;

			const isAllChecked = nChecked === nOptions;
			const isNoneChecked = nChecked === 0;
			const checked = isAllChecked;
			const indeterminate = !isAllChecked && !isNoneChecked;
			const checkAllLabel = isAllChecked ? 'Unselect all' : 'Select all';

			const toggleGroup = () => {
				options.forEach((option) => {
					const { id } = option;
					const wasChecked = records && !!records.find(r => r === id);
					const needsToggle = wasChecked === isAllChecked;
					if (needsToggle) {
						props.toggleMtm(tableId, parentTableId, parentRecordId, id);
					}
				});
			};

			const groupLabel = (
				<CategoryTitle>
					<Heading3>
						{categ} <span>({nChecked} / {nOptions})</span>
						<CheckboxContainer indeterminate={indeterminate} className="checkAll">
							<input 
								id={`${table.id}_mtm_${categ}`}
								checked={checked}
								onChange={toggleGroup}
								type="checkbox"
							/>
							<label htmlFor={`${table.id}_mtm_${categ}`}>{checkAllLabel}</label>
						</CheckboxContainer>
					</Heading3>
				</CategoryTitle>
			);

			return (<MtmGroup key={groupIndex}>
				{groupLabel}
				<GridContainer>
					{inputs}
				</GridContainer>
			</MtmGroup>);

		});
	};


	if (mtmOptions) {
		const options = getOptions();
		return (
			<Subform>
				<SubformHeader className="row">
					<GridItem columns="8">
						<FormHeaderContent table={props.table} titleOverride={props.titleOverride} descriptionAppend={props.descriptionAppend} />
					</GridItem>
					<GridItem columns="4" align="end" className="fcn">
						{props.editSchema()}
						<ToggleCollapse isCollapsed={props.isCollapsed} toggle={props.changeCollapsedState} />
					</GridItem>

				</SubformHeader>

				<Collapsable isCollapsed={props.isCollapsed}>{options}</Collapsable>

			</Subform>
		);
	}

	return null;


}

SubformMtm.propTypes = {
	tableId: PropTypes.number,
	table: PropTypes.object,
	records: PropTypes.array,
	parentTableId: PropTypes.number,
	editSchema: PropTypes.func,
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
