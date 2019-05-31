
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PRIKEY_ALIAS, BANK_IMG_FILE_ALIAS, BANK_IMG_TABLE, BANK_IMG_DIM_ALIAS, BANK_IMG_TITLE_ALIAS, BANK_IMG_COMMENTS_ALIAS } from '../../freestone/schemaProps';

import BankImgThumbnail from '../../containers/fileThumbnail/BankImgThumbnail';

export default class BankImgListCell extends Component {
	static propTypes = {
		lang: PropTypes.string,
		record: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = { editing: false };
	}

	render() {
		const { record } = this.props;
		const comments = record[`${BANK_IMG_TABLE}_${BANK_IMG_COMMENTS_ALIAS}`] ? (<div className="comments">
			Comments : {record[`${BANK_IMG_TABLE}_${BANK_IMG_COMMENTS_ALIAS}`]}
		</div>) : null;
		return (
			<div className="col-sm-3 col-md-2 bank-image-list-item">
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
	}
}
