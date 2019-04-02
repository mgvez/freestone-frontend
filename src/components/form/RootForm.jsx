import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import Save from '../../containers/process/Save';
import Cancel from '../../containers/process/Cancel';
import SingleRecord from '../../containers/form/SingleRecord';
import PermissionsForm from '../../containers/permissions/PermissionsForm';
import PreviewRecord from '../../containers/process/PreviewRecord';

import FormHeaderContent from '../header/FormHeaderContent';
import FormHeader from '../header/FormHeader'; 

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
		language: PropTypes.string,
		hasLanguageToggle: PropTypes.bool,
		table: PropTypes.object,
		lastmodifdate: PropTypes.string,
		recordLabel: PropTypes.string,

		//once saved/cancelled, we can override the defualt action (which is to go to table's list). For example, when bank items are edited, they do not redirect, they only set a state on the insert component
		finishCallback: PropTypes.func,
		fetchTable: PropTypes.func,
		goTo: PropTypes.func,
		fetchRecordRevisionList: PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
		this.setState({
			saving: false,
			isPreviewInited: false,
			afterSave: null,
			language: null,
		});

	}
	componentDidMount() {
		if (!this.props.isModal) {
			window.scrollTo(0, 0);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params !== this.props.params) this.cancelSave();
		this.requireData(nextProps);
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
			afterSave: this.props.finishCallback,
		});
	}

	saveAndForm = () => {
		this.setState({
			...this.state,
			saving: true,
			afterSave: ({ recordId }) => {
				// console.log(recordId, tableName);
				//si record Id est meme, on ne fait que cancel le save, ca reload les vals
				if (String(recordId) === this.props.params.recordId) {
					this.cancelSave();
				} else {
					this.props.goTo(`edit/${this.props.table.name}/${recordId}`);
				}
			},
		});
	}

	cancelSave = () => {
		// console.log('cancel');
		this.setState({
			saving: false,
			afterSave: null,
		});
	}

	requireData(props) {
		const { tableName } = props.params;
		if (!props.table) {
			this.props.fetchTable(tableName);
		} else {
			// this.props.fetchRecordRevisionList(this.props.table.id, this.props.params.recordId);		
		}
	}

	initPreview = () => {
		if (this.state.isPreviewInited) {
			//force save or navigate to preview?
		}

		// console.log('INIT PREVIEW', this.props.table.id, this.props.params.recordId);
		this.setState({
			isPreviewInited: true,
		});
	}

	render() {

		//langue peut être locale (si par ex. dans une modale) pour éviter les rerender des autres formulaires. Si présente en state, priorité sur store
		const language = this.state.language || this.props.language;

		if (this.props.table) {

			if (this.state.saving) {
				return <Save tableId={this.props.table.id} recordId={this.props.params.recordId} callback={this.state.afterSave} cancelSave={this.cancelSave} />;
			}

			let actionBtns;
			//le record a été édité depuis son load à la db. On met les actions pour le save
			if (this.props.isEdited) {
				actionBtns = [
					<a key="fcn_1" onClick={this.save} className="button-round" title="Hold ALT key to leave form open after save">Save</a>,
					<Cancel key="fcn_3" tableName={this.props.table.name} recordId={this.props.params.recordId} callback={this.props.finishCallback} label="Discard changes" />,
				];
			//record pas été édité: juste btn close
			} else {
				actionBtns = [
					<Cancel key="fcn_3" tableName={this.props.table.name} recordId={this.props.params.recordId} callback={this.props.finishCallback} label="Close" />,
				];
			}

			const preview = this.props.table && this.props.table.hasTemplate && this.props.isViewingPreview ? <PreviewRecord tableId={this.props.table.id} recordId={this.props.params.recordId} isPreviewEdited={this.props.isPreviewEdited} /> : null;

			let permsWidget = null;
			if (this.props.table.hasSitePermission) {
				permsWidget = <PermissionsForm table={this.props.table} recordId={this.props.params.recordId} />;
			}

			return (<section className="root-form">
				<DocumentMeta title={`${this.props.table.displayLabel} : /${this.props.params.recordId}`} />

				<FormHeader {...this.props} hasLanguageToggle table={this.props.table} setLanguageState={this.setLanguageState} buttons={actionBtns}>
					<FormHeaderContent table={this.props.table} label={this.props.recordLabel} language={this.props.language} />
				</FormHeader>

				{permsWidget}
				{preview}
				
				<SingleRecord tableId={this.props.table.id} recordId={this.props.params.recordId} isRoot language={language} />

			</section>);

		}

		return null;

	}
}
