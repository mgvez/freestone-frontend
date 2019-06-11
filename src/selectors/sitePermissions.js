import { createSelector } from 'reselect';
import { ALL_RECORDS_ID, EVERYBODY_GROUP_ID } from '../freestone/SchemaProps';

const allPermsSelector = state => state.freestone.permissions.sitePermissions;
const allGroupsSelector = state => state.freestone.permissions.groups;
const permsModifiedSelector = state => state.freestone.permissions.sitePermissionsModified;
const recordIdSelector = (state, props) => props.recordId;
const tableIdSelector = (state, props) => props.tableId || (props.table && props.table.id);


function parseRecordPermissions(userGroups, recordPermissionsList, tablePermissionsList, isForAllRecords) {
	//can the PUBLIC group access this particular record?
	const isPublic = !!~recordPermissionsList.indexOf(EVERYBODY_GROUP_ID);
	
	return userGroups.map(setting => {
		const groupId = Number(setting.id);
		//can this group access to this particular record as per the record's settings
		const isPermittedFromSpecific = !!~recordPermissionsList.indexOf(groupId);
		//can this group access to this particular record as per the table's settings (tablewide, i.e. applies to all records)
		const isPermittedFromDefault = !!~tablePermissionsList.indexOf(groupId);

		const isPermitted = isPermittedFromSpecific || isPublic || isPermittedFromDefault;
		//if permitted from table-wide permissions or if record is completely public, we disable it
		const isDisabled = (isPermittedFromDefault && !isForAllRecords) || (isPublic && groupId !== EVERYBODY_GROUP_ID);

		let disabledMessage = '';
		if (isPermittedFromDefault && !isForAllRecords) disabledMessage = 'This group has access as per the table\'s default settings';
		if (isPublic && groupId !== EVERYBODY_GROUP_ID) disabledMessage = 'This group has access because this record is set to Everybody / Public';

		return { 
			...setting,
			isPermitted,
			isDisabled,
			disabledMessage,
		};
	});
}

/**
	Gets the values of default premissions for all records in a table
 */
export const tableSitePermissionsSelector = createSelector(
	[allPermsSelector, permsModifiedSelector, tableIdSelector],
	(allPerms, permsModified, tableId) => {
		const tablePermissions = allPerms && allPerms[tableId] && allPerms[tableId][ALL_RECORDS_ID];
		const isModified = permsModified && permsModified[tableId] && permsModified[tableId][ALL_RECORDS_ID];
		return {
			tablePermissions,
			isModified,
		};
	}
);

/*
	Gets permissions parsed for each group
*/
export const sitePermissionsSelector = createSelector(
	[allPermsSelector, allGroupsSelector, tableIdSelector, recordIdSelector],
	(allPerms, userGroups, tableId, recordId) => {

		const recordPermissionsList = allPerms && allPerms[tableId] && allPerms[tableId][recordId];
		const tablePermissionsList = allPerms && allPerms[tableId] && allPerms[tableId][ALL_RECORDS_ID];
		// console.log(recordPermissionsList);
		if (tablePermissionsList && recordPermissionsList && userGroups) {
			//est-ce que tous les groupes sont permis pour ce record particulier?
			const isForAllRecords = recordId === ALL_RECORDS_ID;
			const recordPermissions = parseRecordPermissions(userGroups, recordPermissionsList, tablePermissionsList, isForAllRecords);
			const tablePermissions = parseRecordPermissions(userGroups, tablePermissionsList, tablePermissionsList, isForAllRecords);

			// console.log(recordPermissions);
			return {
				recordPermissions,
				tablePermissions,
				userGroups,
				isForAllRecords,
			};
		}

		return {};
		
	}
);

