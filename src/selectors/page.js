import { createSelector } from 'reselect';

const pageIdSelector = (state, props) => props.params && Number(props.params.id);
const pagesSelector = state => state.nav.structure.pages;
const jwtSelector = state => state.auth.jwt;

export const pageSelector = createSelector(
	pageIdSelector,
	pagesSelector,
	jwtSelector,
	(pageId, allPages, jwt) => {
		const page = allPages.find(p => p.id === pageId) || {};
		return {
			title: page.title,
			jwt,
		};
	}
);
