import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from 'components/styles/modalStyles.js';

import { addRecord, fetchList } from 'actions/record';
import { fetchTable } from 'actions/schema';

import { PRIKEY_ALIAS, BANK_IMG_FILE_ALIAS, BANK_IMG_FOLDER_ALIAS, BANK_IMG_TABLE, BANK_IMG_DIM_ALIAS, BANK_IMG_TITLE_ALIAS, BANK_IMG_BG_LAYOUT } from 'freestone/schemaProps';
import { callApi } from 'freestone/api';

import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { RootForm } from 'components/connected/form/RootForm';
import { Paging } from 'components/static/recordList/Paging';

import createRecord from 'freestone/createRecord';
import { bankSelector } from 'selectors/bank';

@connect(
	bankSelector,
	dispatch => bindActionCreators({ fetchList, addRecord, fetchTable }, dispatch)
)
export class BankImgInsert extends Component {
	static propTypes = {
		onClose: React.PropTypes.func,
		//callback to set ID of chosen image as opener value
		setVal: React.PropTypes.func,
		//callback to insert markup of chosen image in opener value
		setMarkup: React.PropTypes.func,
		contentBefore: React.PropTypes.string,
		contentAfter: React.PropTypes.string,
		table: React.PropTypes.object,

		records: React.PropTypes.array,
		page: React.PropTypes.number,
		nPages: React.PropTypes.number,
		curPage: React.PropTypes.number,
		search: React.PropTypes.string,
		lang: React.PropTypes.string,

		fetchList: React.PropTypes.func,
		addRecord: React.PropTypes.func,
		fetchTable: React.PropTypes.func,
	};

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

	onChangePage = (pageNum) => {
		this.props.fetchList(BANK_IMG_TABLE, this.props.search, pageNum);
	};
	
	requireData(props) {
		if (!props.records) this.props.fetchList(BANK_IMG_TABLE, props.search, props.page || 1);
		if (!props.table) this.props.fetchTable(BANK_IMG_TABLE);
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// this.refs.subtitle.style.color = '#f00';
	};

	cancelChange = () => {
		if (this.props.setMarkup) this.props.setMarkup(this.props.contentBefore);
		this.closeModal();
	};

	chooseImage = (e) => {
		const id = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id;
		// console.log(e.currentTarget.dataset.id);

		if (this.props.setVal) {
			this.props.setVal(id);
			this.closeModal(true);
		}

		if (this.props.setMarkup) {
			callApi(`bank/images/figure/${id}`).then(res => {
				// console.log(res);
				this.props.setMarkup(this.props.contentAfter.replace('{{placeholder}}', res.data.markup));
				this.closeModal(true);
			}, err => {
				console.dir(err);
			});
		}
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

	handleSearch = (e) => {
		e.preventDefault();
		const val = this._searchInput.value;
		this.props.fetchList(BANK_IMG_TABLE, val, 1);
	};

	render() {

		let content;
		const { editing } = this.state;
		if (editing) {
			content = (
				<RootForm params={{ recordId: editing, tableName: BANK_IMG_TABLE }} finishCallback={this.stopEditing} isModal />
			);
		} else if (this.props.records) {
			// console.log(this.props.records);
			content = (
				<div className="row">
					{
						this.props.records.map((record, idx) => {
							return (
								<div key={`th${idx}`} className="col-sm-3 col-md-2 bank-image-list-item">
									<FileThumbnail val={record[BANK_IMG_FILE_ALIAS]} dir={record[BANK_IMG_FOLDER_ALIAS]} type={BANK_IMG_BG_LAYOUT} />
									<div className="label">{record[BANK_IMG_DIM_ALIAS]} {record[`${BANK_IMG_TITLE_ALIAS}${this.props.lang}`]}</div>
									<button onClick={this.chooseImage} data-id={record[PRIKEY_ALIAS]} className="button-round-action">Choose</button>
									<button onClick={this.editExistingRecord} data-id={record[PRIKEY_ALIAS]} className="button-round-warning">Edit</button>
								</div>
							);
						})
					}
				</div>
			);
		}

		return (
			<Modal
				isOpen
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.cancelChange}
				closeTimeoutMS={300}
				style={customStyle}
			>
				<div className="bank-image-list-actions">
					<div className="buttons">
						<button onClick={this.cancelChange} className="button-round-bordered-action">Cancel</button>
						<button onClick={this.addRecord} className="button-round-bordered-action"><i className="fa fa-plus-square"></i> New record</button>
					</div>
					<div className="padded-content search-ctn">
						<form onSubmit={this.handleSearch}>
							<input className="search-input" type="text" placeholder="search" ref={(el) => this._searchInput = el} initialValue={this.props.search} />
							<button className="button-search"><i className="fa fa-search"></i></button>
						</form>
					</div>
				</div>
				<div className="bank-image-list">
					{content}
				</div>
				<Paging
					nPages={this.props.nPages}
					curPage={this.props.curPage}
					onChangePage={this.onChangePage}
				/>
			</Modal>
		);
	}
}
