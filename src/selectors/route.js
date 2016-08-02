import { createSelector } from 'reselect';

/**
	Alias; normalize avec un seul selector, au cas ou la struct de react-router-redux reducer changerait
*/

const stateLocationSelector = state => state.routing.locationBeforeTransitions;
const scrollLockSelector = state => state.nav.scrollLock;

export const routeSelector = createSelector(
	[stateLocationSelector, scrollLockSelector],
	(location, scrollLock) => {
		const path = location.pathname;
		// console.log(scrollLock);
		return {
			path,
			scroll: scrollLock[path],
		};
	},
);
