import { createSelector } from 'reselect';
import { TYPE_BANKIMG, TYPE_IMG, TYPE_LANGUAGE } from '../freestone/SchemaProps';
import { getForeignLabel } from './recordLabel';

const rawForeignOptionsSelector = state => state.freestone.foreign.options;
const rawForeignLabelsSelector = state => state.freestone.foreign.labels;
const fieldSelector = (state, props) => props.field;
const valSelector = (state, props) => props.val;
const langSelector = state => state.freestone.env.freestone.languages;

function buildOptions(rawOptions) {
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
			label = label.replace(new RegExp(`${EMPTY}[\\s\\S]*?${FLDSTART}`, 'g'), '').replace(new RegExp(`${FLDSTART}|${EMPTY}`, 'g'), '').trim();
			
			//if field begins by numeric value, will order nmerically by it first
			const labelNumMatch = label.match(/^[0-9.]+/);
			let labelNum = 0;
			if (labelNumMatch) {
				labelNum = Number(labelNumMatch[0]);
				// console.log(label, labelNum);
			}

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
				labelNum,
				image,
				imageBank,
			};
		}).sort((a, b) => {
			const numSort = a.labelNum - b.labelNum;
			return numSort !== 0 ? numSort : a.label < b.label ? -1 : 1;
		});
		// console.log(values);

		carry[fieldId] = {
			fieldId,
			values,
			search: current.search,
			is_partial: current.is_partial,
		};
		return carry;

	}, {});
	// console.log(options);
	return options;
}

export const allForeignOptionsSelector = createSelector(
	[rawForeignOptionsSelector],
	buildOptions,
);

export const allForeignLabelsSelector = createSelector(
	[rawForeignLabelsSelector],
	buildOptions,
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

function makeUneditableSelector() {
	return createSelector(
		[fieldSelector, valSelector, allForeignOptionsSelector, allForeignLabelsSelector],
		(field, val, allOptions, allLabels) => {
			if (!field.foreign) return {};
			const label = getForeignLabel(val, field.id, allOptions, allLabels);
			return {
				label,
			};
		}
	);
}

function makeOptionsSelector() {
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
	const selectorInstance = makeOptionsSelector();
	return (state, props) => {
		return selectorInstance(state, props);
	};
}

export function foreignUneditableMapStateToProps() {
	const selectorInstance = makeUneditableSelector();
	return (state, props) => {
		return selectorInstance(state, props);
	};
}
