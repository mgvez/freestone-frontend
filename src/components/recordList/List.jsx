import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import Paging from './Paging';
import StandardList from './standard/StandardList';
import BankList from './bank/BankList';
import ListSearch from './ListSearch';
import InScroll from '../../containers/utils/InScroll';
import TablePermissions from '../../containers/permissions/TablePermissions';
import ListFetch from '../../containers/process/ListFetch';
import createRecord from '../../freestone/createRecord';
import { Button } from '../../styles/Button';
import { MainZone } from '../../styles/Grid';
import { Icon } from '../../styles/Icon';

import FixedHeader from '../header/FixedHeader';
import ListHeader from '../header/ListHeader';

const LARGE_MINW_BREAKPOINT = 1024;

export default function List(props) {

	const [isLarge, setIsLarge] = useState(true);
	const [isQuickEdit, setIsQuickEdit] = useState(false);
	const toggleQuickEdit = () => {
		const newIsQuickEdit = !isQuickEdit;
		// close side nav if quick editing
		if (newIsQuickEdit) props.toggleNavVisibility(false);
		setIsQuickEdit(newIsQuickEdit);
	};

	useEffect(() => {
		const handleResize = () => {
			const w = window.innerWidth;
			setIsLarge(w > LARGE_MINW_BREAKPOINT);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (!props.table) props.fetchTable(props.tableName);
	});
	
	const getNumRecords = () => {
		return props.groupedRecords && props.groupedRecords.reduce((total, gr) => total + gr.records.reduce((subtotal) => subtotal + 1, 0), 0);
	};

	const addRecord = () => {
		createRecord(props.table).then(res => {
			const { newRecord, newRecordId } = res;
			props.addRecord(props.table.id, newRecord);

			const path = `/edit/${props.tableName}/${newRecordId}`;
			props.goTo(path);
		});
	};

	if (!props.table) return null;

	let readyToScroll = false;

	const addButton = props.canAdd && !isQuickEdit && <Button key="add" onClick={addRecord} round><Icon icon="plus-circle" /> New record</Button>;
	
	const quickEditButton = props.table.isBatchEditable && (
		<Button key="quickedit" warn round onClick={toggleQuickEdit}>
			<Icon icon={isQuickEdit ? 'list' : 'bolt'} />{isQuickEdit ? 'Default list' : 'Quick edit'}
		</Button>
	);
	const quickEditSaveButton = isQuickEdit && props.nQuickedited && (
		<Button key="save" cta round onClick={toggleQuickEdit}>
			<Icon icon="save" />{`Save (${props.nQuickedited})`}
		</Button>
	);

	let records = null;
	// if record list is loaded, display records. Bank records are displayed differently than regular records.
	if (props.groupedRecords) {
		readyToScroll = true;

		if (!props.table.bankName || isQuickEdit) {
			records = (<StandardList
				isLarge={isLarge}
				isQuickEdit={isQuickEdit}
				fields={isQuickEdit ? props.batchEditableFields : props.searchableFields}
				isQuickEdit={isQuickEdit}
				{...props}
			/>);
		} else {
			records = (<BankList
				isLarge={isLarge}
				bankName={props.table.bankName}
				{...props}
			/>);
		}
	}

	const needsFetch = !props.groupedRecords || props.needsFetch;
	// console.log('render list needs fetch %s', needsFetch);
	const output = (
		<section>
			<DocumentMeta title={`${props.table.displayLabel} - list`} />

			<FixedHeader
				renderContent={(headerProps) => {
					return (
						<ListHeader
							table={props.table}
							isLight={headerProps.isFixed}
							buttons={[quickEditSaveButton, quickEditButton, addButton]}
							{...headerProps}
						/>
					);

				}}
			/>

			<TablePermissions table={props.table} />
			<MainZone>
				
				<ListSearch 
					key={`search_${props.tableName}`}
					tableName={props.tableName}
					numRecords={getNumRecords()}
					search={props.params.search}
					goTo={props.goTo}
					needsFetch={needsFetch}
				>
					<ListFetch needsFetch={needsFetch} tableName={props.tableName} params={props.params} />
				</ListSearch>
				<Paging
					nPages={props.nPages}
					curPage={props.curPage}
					tableName={props.tableName}
				/>
				{records}
				<Paging
					nPages={props.nPages}
					curPage={props.curPage}
					tableName={props.tableName}
				/>
			</MainZone>
			
		</section>
	);

	return (
		<InScroll isReady={readyToScroll}>
			{output}
		</InScroll>
	);

}

List.propTypes = {

	params: PropTypes.shape({
		filter: PropTypes.string,
		page: PropTypes.string,
		search: PropTypes.string,
		order: PropTypes.string,
	}),

	tableName: PropTypes.string,
	table: PropTypes.object,
	groupedRecords: PropTypes.array,
	batchEditableFields: PropTypes.array,
	searchableFields: PropTypes.array,
	nPages: PropTypes.number,
	curPage: PropTypes.number,
	nRecords: PropTypes.number,
	swappedRecords: PropTypes.object,
	canAdd: PropTypes.bool,
	needsFetch: PropTypes.bool,
	nQuickedited: PropTypes.number,

	fetchTable: PropTypes.func,
	addRecord: PropTypes.func,
	goTo: PropTypes.func,
	toggleNavVisibility: PropTypes.func,

};
