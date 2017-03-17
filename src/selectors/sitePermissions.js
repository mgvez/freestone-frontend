import { createSelector } from 'reselect';
import { ALL_RECORDS_ID, EVERYBODY_GROUP_ID } from 'freestone/schemaProps';

const allPermsSelector = state => state.permissions.sitePermissions;
const allGroupsSelector = state => state.permissions.groups;
const recordIdSelector = (state, props) => props.recordId;
const tableIdSelector = (state, props) => props.tableId;


export const sitePermissionsSelector = createSelector(
	[allPermsSelector, allGroupsSelector, tableIdSelector, recordIdSelector],
	(allPerms, userGroups, tableId, recordId) => {

		const recordPermissions = allPerms && allPerms[tableId] && allPerms[tableId][recordId];
		const tablePermissions = allPerms && allPerms[tableId] && allPerms[tableId][ALL_RECORDS_ID];
		// console.log(sitePermissions);
		if (tablePermissions && recordPermissions && userGroups) {
			//est-ce que tous les groupes sont permis?
			const isPublic = !!~recordPermissions.indexOf(EVERYBODY_GROUP_ID);
			const permissions = userGroups.map(setting => {
				const groupId = setting.id;
				const isPermittedFromSpecific = !!~recordPermissions.indexOf(groupId);
				const isPermittedFromDefault = !!~tablePermissions.indexOf(groupId);
				
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
			console.log(permissions);
		}
		return {
			recordPermissions,
			tablePermissions,
			userGroups,
			isForAllRecords: recordId === ALL_RECORDS_ID,
		};
	}
);

