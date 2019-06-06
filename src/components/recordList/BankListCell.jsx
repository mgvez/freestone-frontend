
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';


import DeleteBtn from '../../containers/recordList/DeleteBtn';
import InfosFcn from '../../containers/recordList/InfosFcn';
import SelectBankItemBtn from '../../containers/recordList/SelectBankItemBtn';
import BankNUses from '../../containers/widgets/BankNUses';
import { NavLinkButton } from '../../styles/Button';
import colors from '../../styles/Colors';
import { THUMBNAIL_SIZE } from '../../freestone/settings';

import { 
	PRIKEY_ALIAS,
	BANK_IMG_NAME,
	BANK_DOCS_NAME,
	BANK_FILESIZE_ALIAS,
	BANK_FILE_ALIAS,
	BANK_IMG_DIM_ALIAS,
	BANK_TITLE_ALIAS,
	BANK_COMMENTS_ALIAS,
	BANK_PATH_ALIAS,
	BANK_THUMB_ALIAS,
	BANK_NUSES_ALIAS,
	BANK_FOLDER_ALIAS,
	LASTMODIF_DATE_ALIAS,
	CREATED_DATE_ALIAS,
	LABEL_PSEUDOFIELD_ALIAS,
	TYPE_FILE,
	TYPE_IMG,
 } from '../../freestone/schemaProps';


import FileThumbnail from '../../containers/fileThumbnail/FileThumbnail';

const StyledCell = styled.div`
	background: ${colors.gray90};
	border: 1px ${colors.gray76} solid;
	margin: 12px;
	width: ${THUMBNAIL_SIZE}px;

`;

export default class BankListCell extends Component {
	static propTypes = {
		lang: PropTypes.string,
		table: PropTypes.object,
		record: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = { editing: false };
	}

	render() {
		const { record } = this.props;
		const prikeyVal = record[PRIKEY_ALIAS];

		const { name: tableName, bankName } = this.props.table;

		const filePath = record[`${tableName}_${BANK_FILE_ALIAS}_${BANK_PATH_ALIAS}`];
		const thumbPath = record[`${tableName}_${BANK_FILE_ALIAS}_${BANK_THUMB_ALIAS}`];
		const nUses = Number(record[`${tableName}_${BANK_NUSES_ALIAS}`]);

		// console.log(record);
		// console.log(`${BANK_IMG_TABLE} ${BANK_FILE_ALIAS} ${BANK_THUMB_ALIAS}`);
		// console.log(thumbPath);
		const comments = record[`${tableName}_${BANK_COMMENTS_ALIAS}`] ? (<div className="comments">
			Comments : {record[`${tableName}_${BANK_COMMENTS_ALIAS}`]}
		</div>) : null;

		const sizeDisplay = bankName === BANK_IMG_NAME ? (
			<div className="size">
				Original size : {record[`${tableName}_${BANK_IMG_DIM_ALIAS}`]}<br />
				KB : {record[`${tableName}_${BANK_FILESIZE_ALIAS}`]}<br />
			</div>
		) : (
			<div className="size">
				KB : {record[`${tableName}_${BANK_FILESIZE_ALIAS}`]}<br />
			</div>
		);

		return (
			<StyledCell className="">
				<FileThumbnail
					val={record[`${tableName}_${BANK_FILE_ALIAS}`]}
					absolutePath={filePath}
					thumbnailPath={thumbPath}
					dir={record[`${tableName}_${BANK_FILE_ALIAS}_${BANK_FOLDER_ALIAS}`]}
					type={bankName === BANK_DOCS_NAME ? TYPE_FILE : TYPE_IMG}
				/>
				<div className="label">{record[`${tableName}_${BANK_TITLE_ALIAS}${this.props.lang}`]}</div>
				<div className="filename">{record[`${tableName}_${BANK_FILE_ALIAS}`]}</div>
				{sizeDisplay}
				<div className="size">
					<BankNUses bankName={bankName} id={prikeyVal} nUses={nUses} />
				</div>
				{comments}

				<InfosFcn
					prikey={prikeyVal}
					lastmodifdate={record[LASTMODIF_DATE_ALIAS]}
					createddate={record[CREATED_DATE_ALIAS]}
					label={record[LABEL_PSEUDOFIELD_ALIAS]}
					tableName={tableName}
				/>

				<SelectBankItemBtn bankItemId={prikeyVal} />

				<NavLinkButton to={`/edit/${tableName}/${prikeyVal}`} onClick={this.onEditClick} activeClassName="active" round warn >
					<i className="fa fa-pencil"></i>Edit
				</NavLinkButton>
				{!nUses ? <DeleteBtn key={`${tableName}_${prikeyVal}`} className="button-round-danger" tableName={tableName} prikey={prikeyVal} /> : null}
			</StyledCell>
		);
	}
}
