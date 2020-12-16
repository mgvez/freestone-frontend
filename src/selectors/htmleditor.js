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
			const clientConfig = htmlEditorConfig || {};
			const tinymceConfig = {
				...defaultConfig,
				...clientConfig,
				style_formats: [
					...defaultConfig.style_formats,
					...(clientConfig.style_formats || []),
				],
			};
			if (cssPath && cssPath.length) {
				tinymceConfig.content_css = [
					...(tinymceConfig.content_css || []),
					...cssPath.map(p => `${clientPath}${p}`),
				];
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
