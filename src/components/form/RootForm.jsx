import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import Save from '../../containers/process/Save';
import Cancel from '../../containers/process/Cancel';
import SingleRecord from '../../containers/form/SingleRecord';
import PermissionsForm from '../../containers/permissions/PermissionsForm';

import FormHeaderContent from '../header/FormHeaderContent';
import FormHeader from '../header/FormHeader'; 
import InScroll from '../../containers/utils/InScroll'; 
import { Button } from '../../styles/Button';
import { MainZone } from '../../styles/Grid';

const ACTION_STAY_FORM = 'stay_form';
const ACTION_CALLBACK = 'callback';
export default class RootForm extends Component {
	static propTypes = {
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
	};

	constructor(props) {
		super(props);
		this.state = {
			saving: false,
			afterSaveAction: ACTION_CALLBACK,
			language: null,
		};
	}

	componentDidMount() {
		this.requireData(this.props);
		if (!this.props.isModal) {
			window.scrollTo(0, 0);
		}
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	/**
	Les modales sont ouvertes en langue courante, mais quand on toggle la langue, c'est form-specific (i.e. pas dans le store)
	*/
	setLanguageState = (language) => {
		this.setState({
			language,
		});
	}

	save = (e) => {
		if (e.altKey) {
			this.saveAndForm();
			return;
		}
		this.setState({
			saving: true,
			afterSaveAction: ACTION_CALLBACK,
		});
	}

	saveAndForm = () => {
		this.setState({
			...this.state,
			saving: true,
			afterSaveAction: ACTION_STAY_FORM,
		});
	}

	afterSave = ({ recordId }) => {
		const { afterSaveAction } = this.state;
		if (afterSaveAction === ACTION_STAY_FORM) {
			// console.log(recordId, tableName);
			//if record id is same as before, cancel save to reload values
			if (String(recordId) === this.props.params.recordId) {
				this.cancelSave();
			} else {
				this.props.goTo(`/edit/${this.props.table.name}/${recordId}`);
			}
			return true;
		}
		return false;
	}

	cancelSave = () => {
		// console.log('cancel');
		this.setState({
			saving: false,
			afterSaveAction: ACTION_CALLBACK,
		});
	}

	requireData(props) {
		const { tableName } = props.params;
		if (!props.table) {
			this.props.fetchTable(tableName);
		}
	}

	render() {

		//langue peut être locale (si par ex. dans une modale) pour éviter les rerender des autres formulaires. Si présente en state, priorité sur store
		const language = this.state.language || this.props.language;
		// console.log('rendering main form...', this.state);

		if (this.props.table) {

			if (this.state.saving) {
				return <Save tableId={this.props.table.id} recordId={this.props.params.recordId} callback={this.afterSave} cancelSave={this.cancelSave} />;
			}

			let actionBtns;
			//le record a été édité depuis son load à la db. On met les actions pour le save
			if (this.props.isEdited) {
				actionBtns = [
					<Button key="save" onClick={this.save} round="true" title="Hold ALT key to leave form open after save">Save</Button>,
					<Cancel key="cancel" tableName={this.props.table.name} recordId={this.props.params.recordId} label="Discard changes" />,
				];
			//record pas été édité: juste btn close
			} else {
				actionBtns = [
					<Cancel key="cancel" tableName={this.props.table.name} recordId={this.props.params.recordId} label="Close" />,
				];
			}


			let permsWidget = null;
			if (this.props.table.hasSitePermission) {
				permsWidget = <PermissionsForm table={this.props.table} recordId={this.props.params.recordId} />;
			}

			return (<InScroll isReady autoLock>
				<DocumentMeta title={`${this.props.table.displayLabel} : /${this.props.params.recordId}`} />

				<FormHeader {...this.props} hasLanguageToggle table={this.props.table} setLanguageState={this.setLanguageState} buttons={actionBtns}>
					<FormHeaderContent table={this.props.table} label={this.props.recordLabel} language={this.props.language} />
				</FormHeader>

				{permsWidget}
				
				<MainZone>
					<SingleRecord tableId={this.props.table.id} recordId={this.props.params.recordId} isRoot language={language} />
				</MainZone>
			</InScroll>);

		}

		return null;

	}
}
