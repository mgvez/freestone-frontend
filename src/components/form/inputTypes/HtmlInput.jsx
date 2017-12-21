import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TinyMCEInput from 'react-tinymce-input';

import { Input } from './Input';
import { fetchVariable } from '../../../actions/env';
import LinkInsert from '../helpers/LinkInsert';
import BankImgInsert from '../../../containers/from/helpers/BankImgInsert';
import BankFileInsert from '../../../containers/form/helpers/BankFileInsert';
import { mceConfigSelector } from '../../../selectors/env';


@connect(
	mceConfigSelector,
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
