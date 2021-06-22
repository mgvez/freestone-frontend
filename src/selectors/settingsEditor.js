//SHARED
import { createSelector } from 'reselect';

const settingsSchemaSelector = state => state.freestone.settingsEditor.schema;
const settingsValuesSelector = state => state.freestone.settingsEditor.settings;
const currentActiveGroupSelector = state => state.freestone.settingsEditor.activeGroup;


export const settingsEditorSelector = createSelector(
	[settingsSchemaSelector, currentActiveGroupSelector, settingsValuesSelector],
	(settingsSchema, currentActiveGroup, settingsValues) => {
		// console.log(activeSearchItem);
		// console.log(activeGroup);
		// console.log('edited...', isEdited);
		// console.log(settingsValues);

		const schemaGroups = settingsSchema && Object.keys(settingsSchema);

		return {
			settingsSchema,
			schemaGroups,
			settingsValues,
			currentActiveGroup: currentActiveGroup || (settingsSchema && Object.keys(settingsSchema)[0]),
		};
	}
);
