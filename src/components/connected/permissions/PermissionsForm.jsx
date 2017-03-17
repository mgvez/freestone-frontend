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
	};
	
	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
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

	render() {
		if (!this.props.recordPermissions || !this.props.tablePermissions || !this.props.userGroups) return null;
		console.log(this.props.recordPermissions);
		console.log(this.props.userGroups);
		return (
			<div>
				{
					this.props.userGroups.map(group => {
						return <div key={group.id}>{group.name}</div>;
					})
				}
			</div>
		);
	}
}
