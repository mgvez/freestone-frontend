
import { createSelector } from 'reselect';
import { TINYMCE_CONFIG } from '../tinymce/default';

const settingsSelector = state => state.freestone.envVariables && state.freestone.envVariables.settings;
const cssPathSelector = state => state.freestone.env && state.freestone.env.pathCss;
const clientPathSelector = state => state.freestone.env && state.freestone.env.clientPath;

export const mceConfigSelector = createSelector(
	[settingsSelector, cssPathSelector, clientPathSelector],
	(settings, cssPath, clientPath) => {
		const tinymceConfig = {
			...TINYMCE_CONFIG,
			...settings.tinymceConfig,
		};

		console.log(settings, tinymceConfig);

		if (cssPath && cssPath.length) {
			tinymceConfig.content_css = cssPath.map(p => `${clientPath}${p}`);
		}
		
		return {
			tinymceConfig,
		};
	}
);
