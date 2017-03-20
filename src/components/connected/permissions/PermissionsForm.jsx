import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ALL_RECORDS_ID } from 'freestone/schemaProps';

import { sitePermissionsSelector } from 'selectors/sitePermissions';
import * as permissionsActionCreators from 'actions/permissions';

@connect(
	sitePermissionsSelector,
	dispatch => bindActionCreators(permissionsActionCreators, dispatch)
)
export class PermissionsForm extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		recordPermissions: React.PropTypes.array,
		tablePermissions: React.PropTypes.array,
		userGroups: React.PropTypes.array,

		fetchSitePermissions: React.PropTypes.func,
		fetchUsergroups: React.PropTypes.func,
		toggleRecordPermission: React.PropTypes.func,
	};
	
	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	getForm(prefix, permissions) {
		return permissions.map(group => {

			const disabledMessage = group.disabledMessage ? `(${group.disabledMessage})` : '';

			return (<div key={`${prefix}-${group.id}`}>
				{group.name}
				<div className="toggle-container">
					<input
						id={`perm-${prefix}-${group.id}`} 
						data-groupid={group.id} 
						type="checkbox" 
						disabled={group.isDisabled}
						value={group.isPermitted ? 0 : 1}
						onChange={this.changeVal}
						checked={group.isPermitted === true}
					/>
					<label className="toggle" htmlFor={`perm-${prefix}-${group.id}`} data-on-label="1" data-off-label="0"></label>
				</div>
				{disabledMessage}
			</div>);
		});
	}

	requireData(props) {
		// console.log(props);
		if (!props.recordPermissions) {
			this.props.fetchSitePermissions(props.tableId, props.recordId);
		}
		if (!props.tablePermissions) {
			this.props.fetchSitePermissions(props.tableId, ALL_RECORDS_ID);
		}
		if (!props.userGroups) {
			this.props.fetchUsergroups();
		}
	}

	changeVal = (e) => {
		// console.log(e.target.value);
		this.props.toggleRecordPermission(this.props.tableId, this.props.recordId, Number(e.target.dataset.groupid), Number(e.target.value));
	}

	render() {
		if (!this.props.recordPermissions || !this.props.tablePermissions || !this.props.userGroups) return null;
				// 		<h2>Table permissions</h2>
				// {this.getForm('t', this.props.tablePermissions)}
		return (
			<div className="permissions">
				<h2>Record permissions</h2>
				{this.getForm('g', this.props.recordPermissions)}
			</div>
		);
	}
}
