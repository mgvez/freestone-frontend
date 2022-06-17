import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';
import { recordUnalteredMapStateToProps, singleRecordMapStateToProps } from './record';

const makeChangelogSelector = (tableSchemaSelector, recordSelector, recordUnalteredSelector) => createSelector(
	[tableSchemaSelector, recordSelector, recordUnalteredSelector],
	(table, recordProp, recordUnaltered) => {
		const { record } = recordProp;

		let currentChanges;
		if (table) {
			currentChanges = table.fields.reduce((changes, field) => {
				// eslint-disable-next-line eqeqeq
				const isDifferent = record && recordUnaltered && record[field.id] != recordUnaltered[field.id];
				if (isDifferent) {
					changes[field.name] = [
						recordUnaltered[field.id],
						record[field.id],
					];
				}
				return changes;
			}, {});
		}

		return {
			table,
			currentChanges,
		};
	}
);

export function changelogMapStateToProps() {
	const selectorInst = makeChangelogSelector(
		tableSchemaMapStateToProps(),
		singleRecordMapStateToProps(),
		recordUnalteredMapStateToProps()
	);
	return (state, props) => {
		return selectorInst(state, props);
	};
}
