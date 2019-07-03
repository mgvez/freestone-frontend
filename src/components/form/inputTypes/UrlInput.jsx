import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LinkInsert from '../helpers/LinkInsert';
import { Button } from '../../../styles/Button';
import { Input } from '../../../styles/Input';
import { Icon } from '../../../styles/Icon';

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
			<Input type="text" value={this.props.val || ''} onChange={this.props.changeVal} />
			<Button round bordered onClick={this.openModal}><Icon icon="link" /> Url select helper</Button>
		</div>);
	}
}
