
import { createSelector } from 'reselect';

const paramsSelector = (state, props) => props.params || props.match.params || {};

const pageSelector = (state, props) => props.page;
const searchSelector = (state, props) => props.search;
const filterSelector = (state, props) => props.filter;
const orderSelector = (state, props) => props.order;

function getFilterParams(filter) {
	if (!filter) return null;
	const qstrFilters = Object.keys(filter).map((filterKey) => {
		const val = filter[filterKey];
		if (val === null) return null;
		return `${filterKey}=${val}`;
	}).filter(a => a).join(',');
	return qstrFilters;
}

function isListLinkActive(params, page, search, filter, order) {
	// console.log(params, getFilterParams(filter));
	let status = false;
	status |= filter && params.filter === getFilterParams(filter);
	status |= search && params.search === search;
	status |= page && params.page === page;
	status |= order && Math.abs(params.order) === Math.abs(order);
	return () => status;
}

export function getListLink(params, page, search, filter, order) {
	// console.log(filter);

	const nextParams = [];

	if (page && Number(page) !== 1) nextParams.push(`page=${page}`);

	//if we explicitely filter, we clear search. Filters come before search.
	if (filter) {
		const qstrFilters = getFilterParams(filter);
		if (qstrFilters) nextParams.push(`filter=${qstrFilters}`);
		
	} else if (search) {
		nextParams.push(`search=${search}`);
	} else {
		if (params.filter) nextParams.push(`filter=${params.filter}`);
		if (params.search && search === null) nextParams.push(`search=${params.search}`);
	}

	const currentOrder = Number(params.order || 0);
	let nextOrder = order;
	if (Math.abs(currentOrder) === Math.abs(order)) {
		nextOrder = currentOrder > 0 ? -currentOrder : 0;
	}
	// console.log(field.type);

	if (nextOrder) nextParams.push(`order=${nextOrder}`);

	return { pathname: `/list/${params.tableName}`, search: `?${nextParams.join('&')}` };
}

export const getListLinkSelector = createSelector(
	[paramsSelector, pageSelector, searchSelector, filterSelector, orderSelector],
	(params, page, search, filter, order) => {
		
		return {
			to: getListLink(params, page, search, filter, order),
			isActive: isListLinkActive(params, page, search, filter, order),
		};
	}
);
