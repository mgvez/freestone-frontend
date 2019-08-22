import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddRecord from '../../../containers/form/buttons/AddRecord';
import FormHeaderContent from '../../header/FormHeaderContent';
import SingleRecord from '../../../containers/form/SingleRecord';

import { Subform, SubformHeader } from '../../../styles/Form';

export default class SubformSingle extends Component {
	static propTypes = {
		table: PropTypes.object,
		activeRecord: PropTypes.object,
		childrenRecords: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,

		language: PropTypes.string,

	};

	render() {
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		let addBtn;
		if (!this.props.childrenRecords || !this.props.childrenRecords.length) {
			addBtn = (
				<AddRecord 
					table={this.props.table}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
				/>
			);
		}

		return (
			<Subform>
				<SubformHeader>
					<FormHeaderContent table={this.props.table} titleOverride={this.props.titleOverride} descriptionAppend={this.props.descriptionAppend} language={this.props.language} />
					<nav>
						{addBtn}
					</nav>
				</SubformHeader>
				<SingleRecord
					tableId={this.props.table.id}
					recordId={activeRecordId}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
					language={this.props.language}
					isSubform
				/>
			</Subform>
		);

	}
}
