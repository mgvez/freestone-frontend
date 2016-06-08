import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { LinkInsert } from 'components/connected/form/helpers/LinkInsert';
import TinyMCEInput from 'react-tinymce-input';

import VALID_ELEMENTS from 'components/static/form/inputTypes/tinymce/validElements';

const TINYMCE_CONFIG = {
	theme: 'modern',
	menubar: false,
	statusbar: true,
	resize: true,
	forced_root_block: '',
	height: 500,
	toolbar1: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect',
	toolbar2: 'bullist numlist | outdent indent | hr removeformat | subscript superscript | freestoneImageFromBank freestoneDocFromBank freestoneLink | code',
	plugins: 'link,hr,paste,code,freestone',
	theme_modern_toolbar_location: 'top',
	theme_modern_toolbar_align: 'left',
	theme_advanced_blockformats: 'p,h1,h2,h3,h4,h5,h6,article,section,figure,aside,pre',
	extended_valid_elements: 'img[src|alt=|title|class|id|style|height|width]',
	valid_elements: VALID_ELEMENTS,
};

export class HtmlInput extends Input {
	constructor(props) {
		super(props);

		const ExecCommand = (e) => {
			console.log(e);
			const { command } = e;
			// console.log(this, command);
			if (command === 'insertInternalLink') {
				this.setState({
					insertLink: e.value,
				});
			}
		};

		this.handlers = {
			ExecCommand,
		};

		this.state = {
			insertLink: false,
		};

	}

	handleEditorChange = (v) => {
		this.changeVal(v);
	};

	getConfig = () => {
		if (this.tinymceConfig) return this.tinymceConfig;
		this.tinymceConfig = {
			...TINYMCE_CONFIG,
			body_class: this.tableName + '_' + this.name,
		};
		return this.tinymceConfig;
	};

	closeModal = () => {
		this.setState({ insertLink: false });
	};

	render() {

		if (this.state.insertLink) {
			return <LinkInsert onClose={this.closeModal} setVal={this.handleEditorChange} {...this.state.insertLink} />;
		}

		// console.log(`render input ${this.props.field.name}`);
		const cnf = this.getConfig();
		return (
			<TinyMCEInput
				value={this.props.val}
				onChange={this.handleEditorChange}
				tinymceConfig={cnf}
				otherEventHandlers={this.handlers}
			/>
		);
	}
}
