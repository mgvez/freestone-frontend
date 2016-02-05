import { createSelector } from 'reselect';

const rawForeignOptionsSelector = state => state.foreignOptions;

export const foreignOptionsSelector = createSelector(
	[rawForeignOptionsSelector],
	(rawOptions) => {
		// console.log('parse options');
		const options = Object.keys(rawOptions).reduce((carry, fieldId) => {
			const current = rawOptions[fieldId];
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
