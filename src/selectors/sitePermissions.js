import { createSelector } from 'reselect';
import { ALL_RECORDS_ID, EVERYBODY_GROUP_ID } from 'freestone/schemaProps';

const allPermsSelector = state => state.permissions.sitePermissions;
const allGroupsSelector = state => state.permissions.groups;
const recordIdSelector = (state, props) => props.recordId;
const tableIdSelector = (state, props) => props.tableId;


function parseRecordPermissions(userGroups, recordPermissionsList, tablePermissionsList) {
	//can the PUBLIC group access this record?
	const isPublic = !!~recordPermissionsList.indexOf(EVERYBODY_GROUP_ID);
	
	return userGroups.map(setting => {
		const groupId = setting.id;
		//can this group access to this particular record as per the record's settings
		const isPermittedFromSpecific = !!~recordPermissionsList.indexOf(groupId);
		//can this group access to this particular record as per the table's settings (tablewide, i.e. applies to all records)
		const isPermittedFromDefault = !!~tablePermissionsList.indexOf(groupId);

		const isPermitted = isPermittedFromSpecific || isPublic || isPermittedFromDefault;
		//if permitted from table-wide permissions or if record is completely public, we disable it
		const isDisabled = isPermittedFromDefault || isPublic;

		let disabledMessage = '';
		if (isPermittedFromDefault) disabledMessage = 'This group has access as per the table\'s default settings';
		if (isPublic) disabledMessage = 'This group has access because this record is set to Everybody / Public';

		return { 
			...setting,
			isPermitted,
			isDisabled,
			disabledMessage,
		};
	});
}


export const sitePermissionsSelector = createSelector(
	[allPermsSelector, allGroupsSelector, tableIdSelector, recordIdSelector],
	(allPerms, userGroups, tableId, recordId) => {

		const recordPermissionsList = allPerms && allPerms[tableId] && allPerms[tableId][recordId];
		const tablePermissionsList = allPerms && allPerms[tableId] && allPerms[tableId][ALL_RECORDS_ID];
		// console.log(recordPermissionsList);
		if (tablePermissionsList && recordPermissionsList && userGroups) {
			//est-ce que tous les groupes sont permis pour ce record particulier?
			const recordPermissions = parseRecordPermissions(userGroups, recordPermissionsList, tablePermissionsList);
			const tablePermissions = parseRecordPermissions(userGroups, tablePermissionsList, tablePermissionsList);

			// console.log(recordPermissions);
			return {
				recordPermissions,
				tablePermissions,
				userGroups,
				isForAllRecords: recordId === ALL_RECORDS_ID,
			};
		}

		return {};
		
	}
);

