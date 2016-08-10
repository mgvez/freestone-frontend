import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { LinkInsert } from 'components/connected/form/helpers/LinkInsert';
import { BankImgInsert } from 'components/connected/form/helpers/BankImgInsert';
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
	plugins: [
		'link',
		'hr',
		'paste',
		'code',
		'freestone',
		'tabfocus',
		'paste',
		'visualchars',
		'autolink',
	],
	paste_as_text: true,
	paste_merge_formats: true,
	theme_modern_toolbar_location: 'top',
	theme_modern_toolbar_align: 'left',
	theme_advanced_blockformats: 'p,h1,h2,h3,h4,h5,h6,article,section,figure,aside,pre',
	extended_valid_elements: 'img[src|alt=|title|class|id|style|height|width|srcset|sizes]',
	valid_elements: VALID_ELEMENTS,
};

export class HtmlInput extends Input {
	constructor(props) {
		super(props);

		const ExecCommand = (e) => {
			// console.log(e);
			const { command } = e;
			// console.log(command);
			switch (command) {
			case 'insertLink':
			case 'addImageFromBank':
			case 'addDocFromBank':
				this.setState({
					command: {
						name: command,
						params: e.value,
					},
				});
				break;
			default:
				break;
			}
		};

		this.handlers = {
			ExecCommand,
		};

		this.state = {
			command: false,
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
		if (this.props.env.pathCss && this.props.env.pathCss.length) {
			this.tinymceConfig.content_css = this.props.env.pathCss.map(p => `${this.props.env.clientPath}${p}`);
		}
		return this.tinymceConfig;
	};

	closeModal = () => {
		this.setState({ command: null });
	};

	render() {

		if (this.state.command) {
			const { name, params } = this.state.command;
			// console.log(command);
			switch (name) {
			case 'insertLink':
				return <LinkInsert onClose={this.closeModal} setVal={this.handleEditorChange} {...params} />;
			case 'addImageFromBank':
				return <BankImgInsert onClose={this.closeModal} setMarkup={this.handleEditorChange} {...params} />;
			case 'addDocFromBank':
			default:
				break;
			}
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
