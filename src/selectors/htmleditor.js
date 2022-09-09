import { createSelector } from 'reselect';
import { TINYMCE_CONFIG, TINYMCE_TINY_CONFIG } from '../tinymce/default';
import { routeSelector } from './route';

const cssPathSelector = state => state.freestone.env.freestone.pathCss;
const htmlEditorConfigSelector = state => state.freestone.env.freestone.htmlEditorConfig;
const clientPathSelector = state => state.freestone.env.freestone.clientPath;
const fieldTypeSelector = (state, props) => props.field && props.field.type;

function makeSelector(currentFieldTypeSelector) {
	return createSelector(
		[currentFieldTypeSelector, cssPathSelector, htmlEditorConfigSelector, clientPathSelector, routeSelector],
		(fieldType, cssPath, htmlEditorConfig, clientPath, route) => {
			const defaultConfig = fieldType === 'tinyhtml' ? TINYMCE_TINY_CONFIG : TINYMCE_CONFIG;
			let clientConfig = htmlEditorConfig || {};
			if (clientConfig[fieldType]) {
				clientConfig = clientConfig[fieldType];
			}
			const tinymceConfig = {
				...defaultConfig,
				...clientConfig,
				style_formats: [
					...(defaultConfig.style_formats || []),
					...(clientConfig.style_formats || []),
				],
			};

			if (tinymceConfig.content_css) {
				tinymceConfig.content_css = typeof tinymceConfig.content_css === 'string' ? [tinymceConfig.content_css] : tinymceConfig.content_css;
			}

			if (cssPath && cssPath.length) {
				const addedCss = typeof cssPath === 'string' ? [cssPath] : cssPath;
				tinymceConfig.content_css = [
					...(tinymceConfig.content_css || []),
					...addedCss.map(p => `${clientPath}${p}`),
				];
			}

			// MAKE SURE that TinyMce gets a different deep clone of the config for each editor
			return {
				tinymceConfig: JSON.parse(JSON.stringify(tinymceConfig)),
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
