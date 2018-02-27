import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LinkInsert from '../helpers/LinkInsert';

export default class UrlInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		val: PropTypes.any,
	};

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
		this.props.changeVal(v);
	};

	render() {
		if (this.state.isChoosing) {
			return <LinkInsert onClose={this.closeModal} setVal={this.handleEditorChange} isUrlOnly />;
		}
		return (<div className="link-field">
			<input type="text" value={this.props.val} className="form-control" onChange={this.props.changeVal} />
			<button className="button-round-action-bordered" onClick={this.openModal}>Url select helper</button>
		</div>);
	}
}
