
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
	BANK_ISLOCKED_ALIAS,
	BANK_FOLDER_ALIAS,
	LASTMODIF_DATE_ALIAS,
	CREATED_DATE_ALIAS,
	LABEL_PSEUDOFIELD_ALIAS,
	TYPE_FILE,
	TYPE_IMG,
 } from '../../../freestone/schemaProps';


import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import { getItemCss } from '../../../styles/Grid';

const StyledCell = styled.div`
	background: ${colors.backgroundLight};
	border: 1px ${colors.borderMedium} solid;
	margin-bottom: 15px;
	${props => getItemCss(props.columns || props.cols || cssVars.gridColumns, props.offset || 'auto', props.justify, props.align)};
`;

const InfosContainer = styled.div`
	margin: 8px 0;
	display:flex;
	align-content: space-around;
	flex-direction: column;
	font-size: 1em;
	font-weight: ${cssVars.fontWeightNormal};

	.infos {
		margin-bottom: 10px;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	&.top {
		margin: 12px;
	}
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
`;

const Label = styled.div`
	display: inline-block;
	font-weight: ${cssVars.fontWeightBold};
`;

export default class BankListCell extends Component {
	static propTypes = {
		lang: PropTypes.string,
		route: PropTypes.object,
		table: PropTypes.object,
		record: PropTypes.object,
		lockScroll: PropTypes.func,
		rememberListPage: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = { editing: false };
	}

	onEditClick = () => {
		this.props.lockScroll(this.props.route.pathname, window.scrollY);
		this.props.rememberListPage(this.props.table.name, this.props.record[PRIKEY_ALIAS], this.props.route);
	}

	render() {
		const { record } = this.props;
		const prikeyVal = record[PRIKEY_ALIAS];

		const { name: tableName, bankName } = this.props.table;

		const filePath = record[`${tableName}_${BANK_FILE_ALIAS}_${BANK_PATH_ALIAS}`];
		const thumbPath = record[`${tableName}_${BANK_FILE_ALIAS}_${BANK_THUMB_ALIAS}`];
		const nUses = Number(record[`${tableName}_${BANK_NUSES_ALIAS}`]);
		const isLocked = !!Number(record[`${tableName}_${BANK_ISLOCKED_ALIAS}`]);

		// console.log(record);

		const comments = record[`${tableName}_${BANK_COMMENTS_ALIAS}`] ? (<div key="comments" className="infos">
			<strong>Comments</strong> : {record[`${tableName}_${BANK_COMMENTS_ALIAS}`]}
		</div>) : null;

		const sizeDisplay = bankName === BANK_IMG_NAME ? (
			<div key="size" className="infos">
				<strong>Size: </strong>{record[`${tableName}_${BANK_IMG_DIM_ALIAS}`]}, {record[`${tableName}_${BANK_FILESIZE_ALIAS}`]}kb
			</div>
		) : (
			<div key="size" className="infos">
				<strong>Size: </strong>{record[`${tableName}_${BANK_FILESIZE_ALIAS}`]}kb
			</div>
		);

		return (
			<StyledCell columns="4" justify="center" key={`item-${prikeyVal}`}>
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
						<BankNUses bankName={bankName} id={prikeyVal} nUses={nUses} isLocked={isLocked} />
					</Row>
					
					<InfosContainer>
						<div key="title" className="infos">{record[`${tableName}_${BANK_TITLE_ALIAS}${this.props.lang}`]}</div>
						<div key="file" className="infos"><strong>File name :</strong> {record[`${tableName}_${BANK_FILE_ALIAS}`]}</div>
						{sizeDisplay}
						{comments}
					</InfosContainer>

					<Row key="select">
						<SelectBankItemBtn bankItemId={prikeyVal} />
					</Row>

					<Row key="fcn" className="btns">
						{!nUses && !isLocked && <DeleteBtn isButton key={`${tableName}_${prikeyVal}`} className="button-round-danger" tableName={tableName} prikey={prikeyVal} />}
						<NavLinkButton to={`/edit/${tableName}/${prikeyVal}`} onClick={this.onEditClick} activeClassName="active" small="true" round="true" warn="true" >
							<Icon icon="pencil-alt" side="left" />Edit
						</NavLinkButton>
					</Row>

				</InfosContainer>
			</StyledCell>
		);
	}
}
