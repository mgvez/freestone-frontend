import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TinyMCEInput from 'react-tinymce-input';

import LinkInsert from '../helpers/LinkInsert';
import BankImgInsert from '../../../containers/form/helpers/BankImgInsert';
import BankFileInsert from '../../../containers/form/helpers/BankFileInsert';

export default class HtmlInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		fetchVariable: PropTypes.func,
		lang: PropTypes.string,

		field: PropTypes.object,
		tinymceConfig: PropTypes.object,
		val: PropTypes.any,

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
		this.props.changeVal(v);
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
		return (
			<TinyMCEInput
				value={this.props.val}
				onChange={this.handleEditorChange}
				tinymceConfig={this.props.tinymceConfig}
				otherEventHandlers={this.handlers}
			/>
		);
	}
}
