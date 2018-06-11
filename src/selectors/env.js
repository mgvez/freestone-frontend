
import { createSelector } from 'reselect';
import { TINYMCE_CONFIG } from '../tinymce/default';

const settingsSelector = state => state.freestone.env.clientVariables.settings;
const cssPathSelector = state => state.freestone.env.freestone.pathCss;
const clientPathSelector = state => state.freestone.env.freestone.clientPath;
const clientComponentsSelector = state => state.freestone.env.freestone.clientComponents;
const requestedComponentsNameSelector = (state, props) => props.name;

export const mceConfigSelector = createSelector(
	[settingsSelector, cssPathSelector, clientPathSelector],
	(settings, cssPath, clientPath) => {
		if (!settings) return {};

		const config = (settings && settings.tinymceConfig) || {};
		const tinymceConfig = {
			...TINYMCE_CONFIG,
			...config,
		};
		// console.log(tinymceConfig);
		if (cssPath && cssPath.length) {
			tinymceConfig.content_css = cssPath.map(p => `${clientPath}${p}`);
		}
		
		return {
			tinymceConfig,
		};
	}
);


export const clientComponentInfosSelector = createSelector(
	[clientComponentsSelector, requestedComponentsNameSelector],
	(clientComponents, requestedComponentsName) => {
		return (clientComponents && clientComponents.find(el => el.id === requestedComponentsName)) || {};
	}
);

