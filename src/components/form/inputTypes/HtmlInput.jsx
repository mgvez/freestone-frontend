import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TinyMCEInput from 'react-tinymce-input';

import { Input } from './Input';
import { fetchVariable } from '../../../actions/env';
import { LinkInsert } from '../helpers/LinkInsert';
import { BankImgInsert } from '../helpers/BankImgInsert';
import { BankFileInsert } from '../helpers/BankFileInsert';

import VALID_ELEMENTS from './tinymce/validElements';

const TINYMCE_CONFIG = {
	theme: 'modern',
	menubar: false,
	statusbar: true,
	resize: true,
	forced_root_block: 'p',
	height: 200,
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
	paste_as_text: false,
	paste_merge_formats: true,
	theme_modern_toolbar_location: 'top',
	theme_modern_toolbar_align: 'left',
	theme_advanced_blockformats: 'p,h1,h2,h3,h4,h5,h6,article,section,figure,aside,pre',
	extended_valid_elements: 'img[src|alt=|title|class|id|style|height|width|srcset|sizes]',
	valid_elements: VALID_ELEMENTS,
	force_br_newlines: false,
	force_p_newlines: true,
};

@connect(
	state => {
		return {
			settings: state.envVariables && state.envVariables.settings || undefined,
		};
	},
	dispatch => bindActionCreators({ fetchVariable }, dispatch)
)
export class HtmlInput extends Input {
	static propTypes = {
		lang: React.PropTypes.string,
	};
	
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

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(nextProps) {
		if (undefined === nextProps.settings) {
			this.props.fetchVariable('settings');
		}
	}

	handleEditorChange = (v) => {
		this.changeVal(v);
	};

	getConfig = () => {
		const settings = this.props.settings && this.props.settings.tinymceConfig;

		const tinymceConfig = {
			...TINYMCE_CONFIG,
			...settings,
			body_class: `${this.tableName}_${this.name} ${this.props.lang}`,
		};
		if (this.props.env.pathCss && this.props.env.pathCss.length) {
			tinymceConfig.content_css = this.props.env.pathCss.map(p => `${this.props.env.clientPath}${p}`);
		}
		return tinymceConfig;
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
				return <LinkInsert onClose={this.closeModal} setVal={this.handleEditorChange} {...params} lang={this.props.lang} />;
			case 'addImageFromBank':
				return <BankImgInsert onClose={this.closeModal} setMarkup={this.handleEditorChange} lang={this.props.lang} {...params} />;
			case 'addDocFromBank':
				return <BankFileInsert onClose={this.closeModal} setMarkup={this.handleEditorChange} lang={this.props.lang} {...params} />;
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