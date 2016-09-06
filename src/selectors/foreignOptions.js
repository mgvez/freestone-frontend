import { createSelector } from 'reselect';
import { TYPE_BANKIMG, TYPE_IMG } from 'freestone/schemaProps';

const rawForeignOptionsSelector = state => state.foreignOptions;
const fieldIdSelector = (state, props) => props.field.id;
const envSelector = state => state.env;

export const allForeignOptionsSelector = createSelector(
	[rawForeignOptionsSelector, envSelector],
	(rawOptions, env) => {
		// console.log(rawOptions);
		const options = Object.keys(rawOptions).reduce((carry, fieldId) => {
			const current = rawOptions[fieldId];
			//enums : deja au bon format
			if (!current.options || !current.display) return carry;
			const rawLabel = current.display.label;

			const imageField = current.display.fields.find(field => field.type === TYPE_IMG);
			const imageBankField = current.display.fields.find(field => field.type === TYPE_BANKIMG);


			const values = current.options.map(rawOption => {
				const row = rawOption.row;
				const label = row && Object.keys(row).reduce((parsedLabel, field) => {
					const val = row[field];
					return parsedLabel.replace(`{${field}}`, val || '');
				}, rawLabel) || '';
				// console.log(row);

				const image = imageField && row && row[imageField.alias] && {
					dir: row[imageField.alias + '_path'],
					val: row[imageField.alias],
				};
				const imageBank = imageBankField && row && row[imageBankField.alias];
				// console.log(image);
				return {
					row,
					value: rawOption.value,
					label,
					image,
					imageBank,
				};
			}).sort((a, b) => {
				return a.label < b.label ? -1 : 1;
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
