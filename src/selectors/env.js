
import { createSelector } from 'reselect';
import { TINYMCE_CONFIG } from '../tinymce/default';

const settingsSelector = state => state.freestone.env.clientVariables.settings;
const cssPathSelector = state => state.freestone.env.freestone.pathCss;
const clientPathSelector = state => state.freestone.env.freestone.clientPath;

export const mceConfigSelector = createSelector(
	[settingsSelector, cssPathSelector, clientPathSelector],
	(settings, cssPath, clientPath) => {
		const config = (settings && settings.tinymceConfig) || {};
		const tinymceConfig = {
			...TINYMCE_CONFIG,
			...config,
		};

		// console.log(settings, tinymceConfig);

		if (cssPath && cssPath.length) {
			tinymceConfig.content_css = cssPath.map(p => `${clientPath}${p}`);
		}
		
		return {
			tinymceConfig,
		};
	}
);
