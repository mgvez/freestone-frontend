import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import TinyMCEInput from 'react-tinymce-input';
import { BANK_IMG_TABLE, BANK_DOCS_TABLE } from '../../../freestone/SchemaProps';
import { Editor as TinyMCEInput } from '@tinymce/tinymce-react';

import LinkInsert from '../helpers/LinkInsert';

export default class HtmlInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		fetchVariable: PropTypes.func,
		lang: PropTypes.string,
		recordId: PropTypes.string,
		route: PropTypes.string,

		field: PropTypes.object,
		tinymceConfig: PropTypes.object,
		val: PropTypes.any,
		goTo: PropTypes.func,
		setupBankSelect: PropTypes.func,
	};
	
	constructor(props) {
		super(props);

		const ExecCommand = (e) => {
			// console.log(e);
			const { command } = e;
			// console.log(command);
			switch (command) {
			case 'insertLink':
				this.setState({
					command: {
						name: command,
						params: e.value,
					},
				});
				break;
			case 'addImageFromBank':
				this.gotoSelect(BANK_IMG_TABLE);
				break;
			case 'addDocFromBank':
				this.gotoSelect(BANK_DOCS_TABLE);
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

	componentDidMount() {
		this.requireData();
	}

	componentDidUpdate() {
		this.requireData();
	}

	requireData() {
		if (undefined === this.props.tinymceConfig) {
			this.props.fetchVariable('settings');
		}
	}

	handleEditorChange = (evt) => {
		// console.log(evt.target.getContent());
		this.props.changeVal(evt.target.getContent());
	};

	gotoSelect = (bankTable) => {
		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.field.lang,
			this.props.route
		);
		this.props.goTo(`/list/${bankTable}/`);
	}

	setContentFromPlugin = (v) => {
		this.props.changeVal(v);
	};

	closeModal = () => {
		this.setState({ command: null });
	};

	render() {

		// console.log(this.props.val);
		if (!this.props.tinymceConfig) return null;
		if (this.state.command) {
			const { name, params } = this.state.command;
			// console.log(command);
			switch (name) {
			case 'insertLink':
				return <LinkInsert onClose={this.closeModal} setVal={this.setContentFromPlugin} {...params} lang={this.props.lang} />;
			default:
				break;
			}
		}

		// console.log(`render input ${this.props.field.name}`, this.props.val);
		return (
			<TinyMCEInput
				key={this.props.recordId}
				initialValue={this.props.val}
				onChange={this.handleEditorChange}
				init={this.props.tinymceConfig}
				onExecCommand={this.handlers.ExecCommand}
			/>
		);
	}
}
