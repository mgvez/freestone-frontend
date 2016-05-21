import { createSelector } from 'reselect';

const rawForeignOptionsSelector = state => state.foreignOptions;
const fieldIdSelector = (state, props) => props.field.id;

export const allForeignOptionsSelector = createSelector(
	[rawForeignOptionsSelector],
	(rawOptions) => {
		// console.log('parse foreigns');
		const options = Object.keys(rawOptions).reduce((carry, fieldId) => {
			const current = rawOptions[fieldId];
			//enums : deja au bon format
			if (!current.options) return carry;
			const rawLabel = current.display && current.display.label;
			const values = current.options.map(rawOption => {
				const row = rawOption.row;
				const label = row && Object.keys(row).reduce((parsedLabel, field) => {
					const val = row[field];
					return parsedLabel.replace('{' + field + '}', val || '');
				}, rawLabel);
				// console.log(row);
				
				const image = current.image && row && ('ns.settings.folderImages' + row[current.image + '_path'] + '/' + row[current.image]);
				
				return {
					row,
					value: rawOption.value,
					label,
					image,
				};
			});

			carry[fieldId] = {
				fieldId,
				values,
				search: current.search,
			};
			return carry;

		}, {});
		// console.log(options);
		return options;
	},
);

function makeSelector() {
	return createSelector(
		[allForeignOptionsSelector, fieldIdSelector],
		(allOptions, fieldId) => {
			return {
				foreignOptions: allOptions[fieldId],
			};
		}
	);
}

export function foreignOptionsMapStateToProps() {
	const selectorInstance = makeSelector();
	return (state, props) => {
		return selectorInstance(state, props);
	};
}
