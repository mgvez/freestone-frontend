import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ALL_RECORDS_ID } from '../../freestone/SchemaProps';
import PermissionsForm from '../../containers/permissions/PermissionsForm';

export default class TablePermissions extends Component {
	static propTypes = {
		table: PropTypes.object,
		tablePermissions: PropTypes.array,
		isModified: PropTypes.bool,

		savePermissions: PropTypes.func,
	};

	savePermissions = () => {
		// console.log(this.props.tablePermissions);
		this.props.savePermissions(this.props.table.id, ALL_RECORDS_ID, this.props.tablePermissions);
	}

	render() {
		if (!this.props.table.hasSitePermission) return null;

		const btn = this.props.isModified ? <button className="button" onClick={this.savePermissions}>Save permissions</button> : null;

		return (
			<div>
				<h2>Table permissions</h2>
				<p>Check all the user groups who will have access to the records. These permissions will apply to all of the records in this table.</p>
				<PermissionsForm table={this.props.table} recordId={ALL_RECORDS_ID} />
				{btn}
			</div>
		);
	}
}
