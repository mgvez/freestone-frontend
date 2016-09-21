import React from 'react';

import { LinkInsert } from 'components/connected/form/helpers/LinkInsert';
import { Input } from 'components/static/form/inputTypes/Input';

export class UrlInput extends Input {

	constructor(props) {
		super(props);

		this.state = {
			isChoosing: false,
		};
	}

	openModal = () => {
		this.setState({ isChoosing: true });
	}

	closeModal = () => {
		this.setState({ isChoosing: false });
	};

	handleEditorChange = (v) => {
		this.changeVal(v);
	};

	render() {
		if (this.state.isChoosing) {
			return <LinkInsert onClose={this.closeModal} setVal={this.handleEditorChange} isUrlOnly />;
		}
		return (<div>
			<input type="text" value={this.props.val} className="form-control" onChange={this.changeVal} />
			<button className="button-round-action-bordered" onClick={this.openModal}>Url select helper</button>
		</div>);
	}
}