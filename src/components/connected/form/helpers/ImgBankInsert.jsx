import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from './modalStyles.js';

import * as bankActionCreators from 'actions/bank';

import { PRIKEY_ALIAS, BANK_IMG_FILE_ALIAS, BANK_IMG_FOLDER_ALIAS } from 'freestone/schemaProps';
import { callApi } from 'freestone/api';

import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';

@connect(
	state => state.imageBankList,
	dispatch => bindActionCreators({ ...bankActionCreators }, dispatch)
)
export class ImgBankInsert extends Component {
	static propTypes = {
		onClose: React.PropTypes.func,
		setVal: React.PropTypes.func,
		contentBefore: React.PropTypes.string,
		contentAfter: React.PropTypes.string,

		records: React.PropTypes.array,
		page: React.PropTypes.number,
		search: React.PropTypes.string,

		fetchImageBankList: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// console.log(this.props);
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}
	
	requireData(props) {
		if (!props.records) this.props.fetchImageBankList(props.search, props.page || 1);
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// this.refs.subtitle.style.color = '#f00';
	};

	cancelChange = () => {
		this.props.setVal(this.props.contentBefore);
		this.closeModal();
	};

	chooseImage = (e) => {
		const id = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id;
		// console.log(e.currentTarget.dataset.id);

		callApi(`bank/images/${id}`).then(res => {
			console.log(res);
			this.props.setVal(this.props.contentAfter.replace('{{placeholder}}', res.data.markup));
			this.closeModal();
		}, err => {
			console.log(err);
		});
	};

	closeModal = () => {
		this.props.onClose();
	};

	render() {

		let imgs;
		if (this.props.records) {
			imgs = this.props.records.map((record, idx) => {
				// console.log(record);
				return (
					<div key={`th${idx}`}>
						<FileThumbnail val={record[BANK_IMG_FILE_ALIAS]} dir={record[BANK_IMG_FOLDER_ALIAS]} type="img" />
						<button onClick={this.chooseImage} data-id={record[PRIKEY_ALIAS]}>Choose</button>
					</div>
				);
			});
		}

		return (
			<Modal
				isOpen
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				closeTimeoutMS={300}
				style={customStyle}
			>
				<button onClick={this.cancelChange}>cancel</button>
				{imgs}
			</Modal>
		);
	}
}
