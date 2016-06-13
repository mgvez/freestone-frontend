import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from 'react-modal';
import customStyle from './modalStyles.js';

import * as bankActionCreators from 'actions/bank';
import { RequireApiData } from 'utils/RequireApiData';

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
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		// console.log(this.props);
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}
	
	requireData(props) {
		this.requireDataCtrl.requireProp('records', props, this.props.fetchImageBankList, [props.search, props.page || 1]);
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// this.refs.subtitle.style.color = '#f00';
	};

	cancelChange = () => {
		this.props.setVal(this.props.contentBefore);
		this.closeModal();
	};

	closeModal = () => {
		this.props.onClose();
	};

	render() {

		let imgs;
		if (this.props.records) {
			imgs = this.props.records.map((record, idx) => {
				return (
					<FileThumbnail val={record.zva_bank_img_file} dir={record.zva_bank_img_file_folder} type="img" key={`th${idx}`} />
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
