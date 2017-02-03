import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from 'components/styles/modalStyles.js';

import { addRecord, fetchList } from 'actions/record';
import { fetchTable } from 'actions/schema';

import { PRIKEY_ALIAS, BANK_FILE_FILE_ALIAS, BANK_FILE_TABLE, BANK_FILE_TITLE_ALIAS, BANK_FILE_COMMENTS_ALIAS } from 'freestone/schemaProps';
import { callApi } from 'freestone/api';
import { BankFileThumbnail } from 'components/connected/fileThumbnail/BankFileThumbnail';

import { RootForm } from 'components/connected/form/RootForm';
import { Paging } from 'components/static/recordList/Paging';

import createRecord from 'freestone/createRecord';
import { bankSelector } from 'selectors/bank';

@connect(
	bankSelector(BANK_FILE_TABLE),
	dispatch => bindActionCreators({ fetchList, addRecord, fetchTable }, dispatch)
)
export class BankFileInsert extends Component {
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
		this.requireData(this.props);
		this.setState({
			editing: false,
		});
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	onChangePage = (pageNum) => {
		this.props.fetchList(BANK_FILE_TABLE, this.props.search, pageNum);
	};
	
	requireData(props) {
		if (!props.records) this.props.fetchList(BANK_FILE_TABLE, props.search, props.page || 1);
		if (!props.table) this.props.fetchTable(BANK_FILE_TABLE);
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// this.refs.subtitle.style.color = '#f00';
	};

	cancelChange = () => {
		if (this.props.setMarkup) this.props.setMarkup(this.props.contentBefore);
		this.closeModal();
	};

	chooseFile = (e) => {
		const id = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id;
		// console.log(e.currentTarget.dataset.id);

		if (this.props.setVal) {
			this.props.setVal(id);
			this.closeModal(true);
		}

		if (this.props.setMarkup) {
			callApi(`bank/files/link/${id}/${this.props.lang}`).then(res => {
				console.log(res);

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
		this.props.fetchList(BANK_FILE_TABLE, val, 1);
	};


	render() {

		let content;
		const { editing } = this.state;
		if (editing) {
			content = (
				<RootForm params={{ recordId: editing, tableName: BANK_FILE_TABLE }} finishCallback={this.stopEditing} isModal />
			);
		} else if (this.props.records) {
			// console.log(this.props.records);
			content = (
				<div>
					{
						this.props.records.map((categ, idx) => {
							const images = categ.images.map((record, imidx) => {
								const comments = record[BANK_FILE_COMMENTS_ALIAS] ? (<div className="comments">
									Comments : {record[BANK_FILE_COMMENTS_ALIAS]}
								</div>) : null;
								return (
									<div key={`th${imidx}`} className="col-sm-3 col-md-2 bank-file-list-item">
										<BankFileThumbnail id={record[PRIKEY_ALIAS]} />
										<div className="label">{record[`${BANK_FILE_TITLE_ALIAS}${this.props.lang}`]}</div>
										<div className="filename">{record[BANK_FILE_FILE_ALIAS]}</div>
										{comments}
										<button onClick={this.chooseFile} data-id={record[PRIKEY_ALIAS]} className="button-round-action">Choose</button>
										<button onClick={this.editExistingRecord} data-id={record[PRIKEY_ALIAS]} className="button-round-warning">Edit</button>
									</div>
								);
							});
							return (<div key={`categ-${idx}`}>
								<div className="row">
									<div className="col-md-12 ">
										<h2 className="bank-categ">{categ.categName}</h2>
									</div>
								</div>
								<div className="row">
									{images}
								</div>
							</div>);
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
				<div className="bank-file-list-actions">
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
				<div className="bank-file-list">
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