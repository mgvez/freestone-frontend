import { createSelector } from 'reselect';
import { TINYMCE_CONFIG, TINYMCE_TINY_CONFIG } from '../tinymce/default';
import { routeSelector } from './route';

const settingsSelector = state => state.freestone.env.clientVariables.settings;
const cssPathSelector = state => state.freestone.env.freestone.pathCss;
const clientPathSelector = state => state.freestone.env.freestone.clientPath;
const fieldTypeSelector = (state, props) => props.field && props.field.type;

function makeSelector(currentFieldTypeSelector) {
	return createSelector(
		[currentFieldTypeSelector, settingsSelector, cssPathSelector, clientPathSelector, routeSelector],
		(fieldType, settings, cssPath, clientPath, route) => {
			if (!settings) return {};
			const defaultConfig = fieldType === 'tinyhtml' ? TINYMCE_TINY_CONFIG : TINYMCE_CONFIG;

			const config = (settings && settings.tinymceConfig) || {};
			const tinymceConfig = {
				...defaultConfig,
				...config,
			};
			// console.log(tinymceConfig);
			if (cssPath && cssPath.length) {
				tinymceConfig.content_css = cssPath.map(p => `${clientPath}${p}`);
			}
			
			return {
				tinymceConfig,
				route: route.route.pathname,
			};
		}
	);
}

export function htmleditorMapStateToProps() {
	const selectorInst = makeSelector(fieldTypeSelector);
	return (state, props) => {
		return selectorInst(state, props);
	};
}
