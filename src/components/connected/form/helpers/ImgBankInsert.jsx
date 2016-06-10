import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';

export class ImgBankInsert extends Component {
	static propTypes = {
		onClose: React.PropTypes.func,
		setVal: React.PropTypes.func,
		contentBefore: React.PropTypes.string,
		contentAfter: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				Banque d'images
			</div>
		);
	}
}
