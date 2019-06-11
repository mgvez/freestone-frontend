import { createSelector } from 'reselect';
import { GOD_USER_GROUP } from '../freestone/SchemaProps';

const userGroupSelector = state => state.freestone.auth.usergroup;

export const isGodSelector = createSelector(
	[userGroupSelector],
	(userGroup) => {
		return { isGod: userGroup === GOD_USER_GROUP };
	}
);
