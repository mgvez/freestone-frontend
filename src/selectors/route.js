import { createSelector } from 'reselect';

/**
	Alias; normalize avec un seul selector, au cas ou la struct de react-router-redux reducer changerait
*/

const stateLocationSelector = state => state.routing.locationBeforeTransitions;

export const routeSelector = createSelector(
	[stateLocationSelector],
	(location) => {
		return {
			path: location.pathname,
			scroll: location.state && location.state.scroll,
		};
	},
);
