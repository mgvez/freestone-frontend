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

	changeVal = (e) => {
		const v = e.target.value;
		const groupId = e.target.dataset.groupid;
		console.log(v, groupId);
	}

	render() {
		if (!this.props.recordPermissions || !this.props.tablePermissions || !this.props.userGroups) return null;
		return (
			<div>
				{
					this.props.recordPermissions.map(group => {
						return (<div key={group.id}>
							{group.name}
							<div className="toggle-container">
								<input id={`perm-rec-${group.id}`} data-groupid={group.id} type="checkbox" value={group.isPermitted ? '1' : '0'} onChange={this.changeVal} checked={group.isPermitted === true} />
								<label className="toggle" htmlFor={`perm-rec-${group.id}`} data-on-label="1" data-off-label="0"></label>
							</div>
							({group.disabledMessage})
						</div>);
					})
				}
			</div>
		);
	}
}
