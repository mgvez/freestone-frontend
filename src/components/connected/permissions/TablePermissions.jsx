import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ALL_RECORDS_ID } from '../../../freestone/schemaProps';
import { PermissionsForm } from './PermissionsForm';
import * as permissionsActionCreators from '../../../actions/permissions';
import { tableSitePermissionsSelector } from '../../../selectors/sitePermissions';

@connect(
	tableSitePermissionsSelector,
	dispatch => bindActionCreators(permissionsActionCreators, dispatch)
)
export class TablePermissions extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		tablePermissions: React.PropTypes.array,
		isModified: React.PropTypes.bool,

		savePermissions: React.PropTypes.func,
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
