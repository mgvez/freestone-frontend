import { createSelector } from 'reselect';

const pageIdSelector = (state, props) => props.params && props.params.id;
const pagesSelector = state => state.nav.structure.pages;
const pagesHashesSelector = state => state.nav.pageHashes;
const jwtSelector = state => state.auth.jwt;

export const pageSelector = createSelector(
	pageIdSelector,
	pagesSelector,
	pagesHashesSelector,
	jwtSelector,
	(idOrHash, allPages, allHashes, jwt) => {

		const fromHash = allHashes[idOrHash];
		// console.log(allHashes);
		// console.log(idOrHash);
		// console.log(fromHash);
		const pageId = fromHash ? fromHash.pageId : Number(idOrHash);
		// console.log(pageId);
		const page = allPages.find(p => p.id === pageId) || {};
		return {
			title: page.title,
			jwt,
			id: pageId,
			resolvedUrl: fromHash && fromHash.path,
		};
	}
);
