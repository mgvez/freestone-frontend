import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from './modalStyles.js';

import { addRecord } from 'actions/record';
import { fetchTable } from 'actions/schema';
import * as bankActionCreators from 'actions/bank';

import { PRIKEY_ALIAS, BANK_IMG_FILE_ALIAS, BANK_IMG_FOLDER_ALIAS, BANK_IMG_TABLE } from 'freestone/schemaProps';
import { callApi } from 'freestone/api';

import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { RootForm } from 'components/connected/form/RootForm';

import createRecord from 'freestone/createRecord';
import { bankSelector } from 'selectors/bank';

@connect(
	bankSelector,
	dispatch => bindActionCreators({ ...bankActionCreators, addRecord, fetchTable }, dispatch)
)
export class ImgBankInsert extends Component {
	static propTypes = {
		onClose: React.PropTypes.func,
		setVal: React.PropTypes.func,
		contentBefore: React.PropTypes.string,
		contentAfter: React.PropTypes.string,
		table: React.PropTypes.object,

		records: React.PropTypes.array,
		page: React.PropTypes.number,
		search: React.PropTypes.string,

		fetchImageBankList: React.PropTypes.func,
		addRecord: React.PropTypes.func,
		fetchTable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// console.log(this.props);
		this.requireData(this.props);
		this.setState({
			editing: false,
		});
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}
	
	requireData(props) {
		if (!props.records) this.props.fetchImageBankList(props.search, props.page || 1);
		if (!props.table) this.props.fetchTable(BANK_IMG_TABLE);
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
			// console.log(res);
			this.props.setVal(this.props.contentAfter.replace('{{placeholder}}', res.data.markup));
			this.closeModal(true);
		}, err => {
			console.log(err);
		});
	};

	closeModal = () => {
		this.props.onClose();
	};

	addRecord = () => {
		const { newRecord, newRecordId } = createRecord(this.props.table);
		this.props.addRecord(this.props.table.id, newRecord);
		this.setState({
			editing: newRecordId,
		});
	};

	editExistingRecord = (e) => {
		const editing = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id;
		this.setState({
			editing,
		});
	};

	stopEditing = () => {
		this.setState({
			editing: null,
		});
	};

	render() {

		let content;
		const { editing } = this.state;
		if (editing) {
			content = (
				<RootForm params={{ recordId: editing, tableName: BANK_IMG_TABLE }} finishCallback={this.stopEditing} isModal />
			);
		} else if (this.props.records) {
			content = this.props.records.map((record, idx) => {
				// console.log(record);
				return (
					<div key={`th${idx}`}>
						<FileThumbnail val={record[BANK_IMG_FILE_ALIAS]} dir={record[BANK_IMG_FOLDER_ALIAS]} type="img" />
						<button onClick={this.chooseImage} data-id={record[PRIKEY_ALIAS]}>Choose</button>
						<button onClick={this.editExistingRecord} data-id={record[PRIKEY_ALIAS]}>Edit</button>
					</div>
				);
			});
		}

		return (
			<Modal
				isOpen
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.cancelChange}
				closeTimeoutMS={300}
				style={customStyle}
			>
				<button onClick={this.cancelChange}>cancel</button>
				<button onClick={this.addRecord}><i className="fa fa-plus-square"></i> New record</button>
				{content}
			</Modal>
		);
	}
}
