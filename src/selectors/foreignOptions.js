import { createSelector } from 'reselect';
import { TYPE_BANKIMG, TYPE_IMG, TYPE_LANGUAGE } from 'freestone/schemaProps';

const rawForeignOptionsSelector = state => state.foreignOptions;
const fieldSelector = (state, props) => props.field;
const envSelector = state => state.env;
const langSelector = state => state.env.languages;

export const allForeignOptionsSelector = createSelector(
	[rawForeignOptionsSelector, envSelector],
	(rawOptions, env) => {
		// console.log(rawOptions);
		const options = Object.keys(rawOptions).reduce((carry, fieldId) => {
			const current = rawOptions[fieldId];
			//enums : deja au bon format
			if (!current.options || !current.display) return carry;
			const rawLabel = current.display.label;

			const imageField = current.display.fields && current.display.fields.find(field => field.type === TYPE_IMG);
			const imageBankField = current.display.fields && current.display.fields.find(field => field.type === TYPE_BANKIMG);


			const values = current.options.map(rawOption => {
				const row = rawOption.row;
				const FLDSTART = '°°';
				const EMPTY = '_____';
				let label = row && Object.keys(row).reduce((parsedLabel, field) => {
					const val = row[field] || '';
					return parsedLabel.replace(`{${field}}`, (val && `${FLDSTART}${val}`) || EMPTY);
				}, rawLabel) || '';
				//enleve les separateurs entre les champs vides
				label = label.replace(new RegExp(`${EMPTY}[\\s\\S]*?${FLDSTART}`, 'g'), '').replace(new RegExp(`${FLDSTART}|${EMPTY}`, 'g'), '');

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

//format language list to display in dropdown
function getLanguages(languages) {
	// console.log(languages);
	return {
		values: languages.map(lang => {
			return {
				value: lang.key,
				label: `${lang.key} - ${lang.name}`,
			};
		}),
	};
}

function makeSelector() {
	return createSelector(
		[allForeignOptionsSelector, fieldSelector, langSelector],
		(allOptions, field, languages) => {

			//normal foreign
			let foreignOptions = allOptions[field.id];

			//language type: special type of foreign whose values come from an environtment var (available languages)
			if (field.type === TYPE_LANGUAGE) {
				foreignOptions = getLanguages(languages);
			}

			return {
				foreignOptions,
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
