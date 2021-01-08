import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import Save from '../../containers/process/Save';
import Cancel from '../../containers/process/Cancel';
import SingleRecord from '../../containers/form/SingleRecord';
import PermissionsForm from '../../containers/permissions/PermissionsForm';
import LanguageToggler from '../../containers/form/LanguageToggler';
import PreviewRecord from '../../containers/process/PreviewRecord';
import RecordInfo from '../../containers/header/info/RecordInfo';

import FixedHeader from '../header/FixedHeader';
import FormHeaderContent from '../header/info/FormHeaderContent';
import InScroll from '../../containers/utils/InScroll'; 
import { Button } from '../../styles/Button';
import { MainZone } from '../../styles/Grid';

const ACTION_STAY_FORM = 'stay_form';
const ACTION_CALLBACK = 'callback';
export default function RootForm(props) {

	const [isSaving, setIsSaving] = useState(false);
	const [afterSaveAction, setAfterSaveAction] = useState(ACTION_CALLBACK);
	// Les modales sont ouvertes en langue courante, mais quand on toggle la langue, c'est form-specific (i.e. pas dans le store)
	const [stateLanguage, setStateLanguage] = useState(null);

	useEffect(() => {
		if (!props.isModal) {
			window.scrollTo(0, 0);
		}
	}, []);

	useEffect(() => {
		const { tableName } = props.params;
		if (!props.table) {
			props.fetchTable(tableName);
		}
	});

	const saveAndForm = () => {
		setIsSaving(true);
		setAfterSaveAction(ACTION_STAY_FORM);
	};

	const save = (e) => {
		if (e.altKey) {
			saveAndForm();
			return;
		}

		setIsSaving(true);
		setAfterSaveAction(ACTION_CALLBACK);
	};

	const cancelSave = () => {
		setIsSaving(false);
		setAfterSaveAction(ACTION_CALLBACK);
	};

	const afterSave = (res) => {
		if (afterSaveAction === ACTION_STAY_FORM) {
			// console.log(recordId, tableName);
			//if record id is same as before, cancel save to reload values
			if (String(res.recordId) === props.params.recordId) {
				cancelSave();
			} else {
				props.goTo(`/edit/${props.table.name}/${res.recordId}`);
			}
			return true;
		}
		return false;
	};


	//langue peut être locale (si par ex. dans une modale) pour éviter les rerender des autres formulaires. Si présente en state, priorité sur store
	const language = stateLanguage || props.language;
	// console.log('rendering main form...', this.state);
	const { table } = props;
	if (table) {
		const { recordId } = props.params;
		if (isSaving) {
			return <Save tableId={table.id} recordId={recordId} callback={afterSave} cancelSave={cancelSave} />;
		}

		let actionBtns;
		//le record a été édité depuis son load à la db. On met les actions pour le save
		if (props.isEdited) {
			actionBtns = [
				<Button key="save" onClick={save} round="true" title="Hold ALT key to leave form open after save">Save</Button>,
				<Cancel key="cancel" tableName={table.name} recordId={recordId} label="Discard changes" />,
			];
		//record pas été édité: juste btn close
		} else {
			actionBtns = [
				<Cancel key="cancel" tableName={table.name} recordId={recordId} label="Close" />,
			];
		}


		let permsWidget = null;
		if (table.hasSitePermission) {
			permsWidget = <PermissionsForm table={table} recordId={recordId} />;
		}

		const previewProcessor = table && table.hasTemplate ? (
			<PreviewRecord
				key="preview"
				tableId={table.id}
				recordId={recordId}
				isPreviewEdited={props.isPreviewEdited}
				isViewingPreview={props.isViewingPreview}
				setIsPreviewing={props.setIsPreviewing}
			/>
		) : null;

		return (<InScroll isReady autoLock>
			<DocumentMeta title={`${table.displayLabel} : /${recordId}`} />

			<FixedHeader
				key={`${table.id}:${recordId}`}
				buttons={() => actionBtns}
				infos={(isFixed) => (
					<RecordInfo
						tableId={table.id}
						recordId={recordId}
						lastmodifdate={props.lastmodifdate}
						isLight={isFixed}
					>
						<FormHeaderContent table={table} label={props.recordLabel} language={language} />
					</RecordInfo>
				)}
				popout={() => [
					previewProcessor,
					<LanguageToggler key="langtoggle" onChangeLang={props.isModal ? setStateLanguage : null} localLanguage={language} />,
				]}
			/>
			

			{permsWidget}
			
			<MainZone>
				<SingleRecord tableId={table.id} recordId={recordId} isRoot language={language} />
			</MainZone>
		</InScroll>);

	}

	return null;


}


RootForm.propTypes = {
	params: PropTypes.shape({
		tableName: PropTypes.string,
		recordId: PropTypes.string,
	}),

	isModal: PropTypes.bool,
	isEdited: PropTypes.bool,
	isPreviewEdited: PropTypes.bool,
	isViewingPreview: PropTypes.bool,
	previewType: PropTypes.string,
	language: PropTypes.string,
	hasLanguageToggle: PropTypes.bool,
	table: PropTypes.object,
	lastmodifdate: PropTypes.string,
	recordLabel: PropTypes.string,
	fetchTable: PropTypes.func,
	goTo: PropTypes.func,
	setIsPreviewing: PropTypes.func,
	fetchSlug: PropTypes.func,
};
