import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import TinyMCEInput from 'react-tinymce-input';
import { BANK_IMG_TABLE, BANK_DOCS_TABLE } from '../../../freestone/schemaProps';
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
			// console.log(command);
			const { command, value: { contentBefore } } = e;
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
					this.gotoSelect(BANK_IMG_TABLE, contentBefore);
					break;
				case 'addDocFromBank':
					this.gotoSelect(BANK_DOCS_TABLE, contentBefore);
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

	handleEditorChange = (val) => {
		this.props.changeVal(val);
	};

	gotoSelect = (bankTable, contentBefore) => {
		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.lang,
			this.props.route,
			contentBefore
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

		if (!this.props.tinymceConfig) return null;
		if (this.state.command) {
			const { name, params } = this.state.command;
			switch (name) {
				case 'insertLink':
					return <LinkInsert onClose={this.closeModal} setVal={this.setContentFromPlugin} {...params} lang={this.props.lang} />;
				default:
					break;
			}
		}

		return (
			<TinyMCEInput
				key={this.props.recordId}
				value={this.props.val}
				onEditorChange={this.handleEditorChange}
				init={this.props.tinymceConfig}
				onExecCommand={this.handlers.ExecCommand}
			/>
		);
	}
}
