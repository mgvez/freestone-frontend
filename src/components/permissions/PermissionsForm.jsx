import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ALL_RECORDS_ID } from '../../freestone/schemaProps';
import { ToggleContainer } from '../../styles/Input';

export default class PermissionsForm extends Component {
	static propTypes = {
		table: PropTypes.object,
		recordId: PropTypes.string,
		
		recordPermissions: PropTypes.array,
		tablePermissions: PropTypes.array,
		userGroups: PropTypes.array,

		fetchSitePermissions: PropTypes.func,
		fetchUsergroups: PropTypes.func,
		toggleRecordPermission: PropTypes.func,
	};
	
	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	getForm(prefix, permissions) {
		return permissions.map(group => {

			const disabledMessage = group.disabledMessage ? `(${group.disabledMessage})` : '';

			return (<div key={`${prefix}-${group.id}`}>
				{group.name}
				<ToggleContainer small>
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
				</ToggleContainer>
				{disabledMessage}
			</div>);
		});
	}

	requireData(props) {
		// console.log(props);
		if (!props.recordPermissions) {
			this.props.fetchSitePermissions(props.table.id, props.recordId);
		}
		if (!props.tablePermissions) {
			this.props.fetchSitePermissions(props.table.id, ALL_RECORDS_ID);
		}
		if (!props.userGroups) {
			this.props.fetchUsergroups();
		}
	}

	changeVal = (e) => {
		// console.log(e.target.value);
		this.props.toggleRecordPermission(this.props.table.id, this.props.recordId, Number(e.target.dataset.groupid), Number(e.target.value));
	}

	render() {

		if (!this.props.recordPermissions || !this.props.tablePermissions || !this.props.userGroups) return null;
		
		return (
			<div className="permissions">
				{this.getForm('g', this.props.recordPermissions)}
			</div>
		);
	}
}
