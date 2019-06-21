
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


import DeleteBtn from '../../../containers/recordList/DeleteBtn';
import InfosFcn from '../../../containers/recordList/InfosFcn';
import SelectBankItemBtn from '../../../containers/recordList/bank/SelectBankItemBtn';
import BankNUses from '../../../containers/recordList/bank/BankNUses';
import { NavLinkButton } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import cssVars from '../../../styles/Variables';
import { THUMBNAIL_SIZE } from '../../../freestone/settings';
import { Icon } from '../../../styles/Icon';

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
 } from '../../../freestone/SchemaProps';


import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';

const StyledCell = styled.div`
	background: ${colors.backgroundMainAccent};
	border: 1px ${colors.borderMedium} solid;
	margin: 0 12px 12px 0;
	width: ${THUMBNAIL_SIZE}px;
`;

const InfosContainer = styled.div`
	margin: 8px 0;
	display:flex;
	align-content: space-around;
	flex-direction: column;
	font-size: 0.9em;
	font-weight: ${cssVars.fontWeightSemibold};
	&.top {
		margin: 12px;
	}
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Label = styled.div`
	display: inline-block;
	font-weight: ${cssVars.fontWeightBold};
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
		const comments = record[`${tableName}_${BANK_COMMENTS_ALIAS}`] ? (<div key="comments">
			<Label>Comments</Label> : {record[`${tableName}_${BANK_COMMENTS_ALIAS}`]}
		</div>) : null;

		const sizeDisplay = bankName === BANK_IMG_NAME ? (
			<div key="size">
				{record[`${tableName}_${BANK_IMG_DIM_ALIAS}`]}, {record[`${tableName}_${BANK_FILESIZE_ALIAS}`]}kb
			</div>
		) : (
			<div key="size">
				{record[`${tableName}_${BANK_FILESIZE_ALIAS}`]}kb
			</div>
		);

		return (
			<StyledCell key={`item-${prikeyVal}`}>
				<FileThumbnail
					val={record[`${tableName}_${BANK_FILE_ALIAS}`]}
					absolutePath={filePath}
					thumbnailPath={thumbPath}
					dir={record[`${tableName}_${BANK_FILE_ALIAS}_${BANK_FOLDER_ALIAS}`]}
					type={bankName === BANK_DOCS_NAME ? TYPE_FILE : TYPE_IMG}
				/>
				<InfosContainer className="top">
					<Row key="infos">
						<InfosFcn
							prikey={prikeyVal}
							lastmodifdate={record[LASTMODIF_DATE_ALIAS]}
							createddate={record[CREATED_DATE_ALIAS]}
							label={record[LABEL_PSEUDOFIELD_ALIAS]}
							tableName={tableName}
						/>
						<BankNUses bankName={bankName} id={prikeyVal} nUses={nUses} />
					</Row>
					
					<InfosContainer>
						<div key="title">{record[`${tableName}_${BANK_TITLE_ALIAS}${this.props.lang}`]}</div>
						<div key="file">{record[`${tableName}_${BANK_FILE_ALIAS}`]}</div>
						{sizeDisplay}
						{comments}
					</InfosContainer>

					<Row key="select">
						<SelectBankItemBtn bankItemId={prikeyVal} />
					</Row>

					<Row key="fcn" className="btns">
						{!nUses && <DeleteBtn isButton key={`${tableName}_${prikeyVal}`} className="button-round-danger" tableName={tableName} prikey={prikeyVal} />}
						<NavLinkButton to={`/edit/${tableName}/${prikeyVal}`} onClick={this.onEditClick} activeClassName="active" small="true" round="true" warn="true" >
							<Icon icon="pencil" />Edit
						</NavLinkButton>
					</Row>

				</InfosContainer>
			</StyledCell>
		);
	}
}
