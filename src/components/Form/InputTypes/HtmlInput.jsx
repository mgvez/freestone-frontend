import React from 'react';

import { Input } from 'components/Form/InputTypes/Input';
import TinyMCEInput from 'react-tinymce-input';

import VALID_ELEMENTS from 'components/Form/InputTypes/tinymce/validElements';

const TINYMCE_CONFIG = {
	theme: 'modern',
	menubar: false,
	// plugins : 'paste,style',//,vadmin,inlinepopups",
	statusbar: true,
	resize: true,
	forced_root_block: '',
	height: 500,
	toolbar1: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect',
	toolbar2: 'bullist numlist | outdent indent | hr removeformat | subscript superscript | code',
	plugins: 'link,hr,paste,code',
	theme_modern_toolbar_location: 'top',
	theme_modern_toolbar_align: 'left',
	theme_advanced_blockformats: 'p,h1,h2,h3,h4,h5,h6,article,section,figure,aside,pre',
	valid_elements: VALID_ELEMENTS,
};


export class HtmlInput extends Input {
	
	handleEditorChange = (v) => {
		this.changeVal(v);
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (
			<TinyMCEInput
				value={this.props.val}
				onChange={this.handleEditorChange}
				tinymceConfig={TINYMCE_CONFIG}
			/>
		);
	}
}
