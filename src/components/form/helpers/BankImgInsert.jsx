import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import customStyle from '../../styles/modalStyles.js';

import { PRIKEY_ALIAS, BANK_IMG_FILE_ALIAS, BANK_IMG_TABLE, BANK_IMG_DIM_ALIAS, BANK_IMG_TITLE_ALIAS, BANK_IMG_COMMENTS_ALIAS } from '../../../freestone/schemaProps';
import { callApi, getEndpoint } from '../../../freestone/api';

import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import RootForm from '../../../containers/form/RootForm';
import Paging from '../../recordList/Paging';

import createRecord from '../../../freestone/createRecord';

export default class BankImgInsert extends Component {
	static propTypes = {
		onClose: PropTypes.func,
		//callback to set ID of chosen image as opener value
		setVal: PropTypes.func,
		//callback to insert markup of chosen image in opener value
		setMarkup: PropTypes.func,
		contentBefore: PropTypes.string,
		contentAfter: PropTypes.string,
		table: PropTypes.object,

		records: PropTypes.array,
		page: PropTypes.number,
		nPages: PropTypes.number,
		curPage: PropTypes.number,
		search: PropTypes.string,
		lang: PropTypes.string,

		fetchList: PropTypes.func,
		addRecord: PropTypes.func,
		fetchTable: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = { editing: false };
	}
		
	componentDidMount() {
		// console.log(this.props);
		this.requireData(this.props);
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
			callApi(getEndpoint(`bank/images/figure/${id}`)).then(res => {
				// console.log(res);
				this.props.setMarkup(this.props.contentAfter.replace('{{placeholder}}', res.data.markup));
				this.closeModal(true);
			}, err => {
				console.dir(err);// eslint-disable-line
			});
		}
	};

	closeModal = () => {
		this.props.onClose();
	};

	addRecord = () => {
		createRecord(this.props.table).then(res => {
			const { newRecord, newRecordId } = res;
			this.props.addRecord(this.props.table.id, newRecord);
			this.setState({
				editing: newRecordId,
			});
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
				<div>
					{
						this.props.records.map((categ, idx) => {
							const images = categ.images.map((record, imidx) => {
								const comments = record[`${BANK_IMG_TABLE}_${BANK_IMG_COMMENTS_ALIAS}`] ? (<div className="comments">
									Comments : {record[`${BANK_IMG_TABLE}_${BANK_IMG_COMMENTS_ALIAS}`]}
								</div>) : null;
								return (
									<div key={`th${imidx}`} className="col-sm-3 col-md-2 bank-image-list-item">
										<BankImgThumbnail id={record[PRIKEY_ALIAS]} />
										<div className="label">{record[`${BANK_IMG_TABLE}_${BANK_IMG_TITLE_ALIAS}${this.props.lang}`]}</div>
										<div className="filename">{record[`${BANK_IMG_TABLE}_${BANK_IMG_FILE_ALIAS}`]}</div>
										<div className="size">
											Original size : {record[`${BANK_IMG_TABLE}_${BANK_IMG_DIM_ALIAS}`]}
										</div>
										{comments}
										<button onClick={this.chooseImage} data-id={record[PRIKEY_ALIAS]} className="button-round-action">Choose</button>
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
				contentLabel="Image Insert"
				style={customStyle}
			>
				<div className="bank-image-list-actions">
					<div className="buttons">
						<button onClick={this.cancelChange} className="button-round-bordered-action">Cancel</button>
						<button onClick={this.addRecord} className="button-round-bordered-action"><i className="fa fa-plus-square"></i> New record</button>
					</div>
					<div className="padded-content search-ctn">
						<form onSubmit={this.handleSearch}>
							<input className="search-input" type="text" placeholder="search" ref={(el) => this._searchInput = el} defaultValue={this.props.search} />
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
