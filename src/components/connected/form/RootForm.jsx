import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import { goTo } from 'actions/nav';
import { fetchRecordRevisionList } from 'actions/record';
import DocumentMeta from 'react-document-meta';

import { rootFormMapStateToProps } from 'selectors/rootForm';

import { Save } from 'components/connected/process/Save';
import { Cancel } from 'components/connected/process/Cancel';
import { CopyRecord } from 'components/connected/form/buttons/CopyRecord';
import { Header } from 'components/static/form/Header';
import { SingleRecord } from 'components/connected/form/SingleRecord';

import { FormHeader } from 'components/connected/header/FormHeader'; 

@connect(
	rootFormMapStateToProps,
	dispatch => bindActionCreators({ ...schemaActionCreators, goTo, fetchRecordRevisionList }, dispatch)
)
export class RootForm extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			recordId: React.PropTypes.string,
		}),

		isModal: React.PropTypes.bool,
		isEdited: React.PropTypes.bool,
		language: React.PropTypes.string,
		hasLanguageToggle: React.PropTypes.bool,
		table: React.PropTypes.object,
		lastmodifdate: React.PropTypes.string,
		slug: React.PropTypes.string,

		//once saved/cancelled, we can override the defualt action (which is to go to table's list). For example, when bank items are edited, they do not redirect, they only set a state on the insert component
		finishCallback: React.PropTypes.func,
		fetchTable: React.PropTypes.func,
		goTo: React.PropTypes.func,
		fetchRecordRevisionList: React.PropTypes.func,
	};

	componentWillMount() {

		if (!this.props.isModal) {
			window.scrollTo(0, 0);
		}

		this.requireData(this.props);

		this.setState({
			saving: false,
			afterSave: null,
			language: null,
		});

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

	saveAndBack = () => {
		this.setState({
			saving: true,
			afterSave: this.props.finishCallback,
		});
	}

	saveAndForm = () => {
		this.setState({
			saving: true,
			afterSave: ({ recordId, tableName }) => {
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
					<a key="fcn_1" onClick={this.saveAndBack} className="button-round">Save and close</a>,
					<a key="fcn_2" onClick={this.saveAndForm} className="button-round-lighter">Save</a>,
					<Cancel key="fcn_3" tableName={this.props.table.name} recordId={this.props.params.recordId} callback={this.props.finishCallback} label="Discard changes" />,
				];
			//record pas été édité: juste btn close
			} else {
				actionBtns = [
					<Cancel key="fcn_3" tableName={this.props.table.name} recordId={this.props.params.recordId} callback={this.props.finishCallback} label="Close" />,
				];
			}

			// actionBtns.push(<CopyRecord key="fcn_copy" recordId={this.props.params.recordId} tableId={this.props.table.id} />);

			return (<section className="root-form">
				<DocumentMeta title={`${this.props.table.displayLabel} : /${this.props.params.recordId}`} />

				<FormHeader {...this.props} hasLanguageToggle table={this.props.table} setLanguageState={this.setLanguageState} buttons={actionBtns}>
					<Header table={this.props.table} />
				</FormHeader>

				<SingleRecord tableId={this.props.table.id} recordId={this.props.params.recordId} isRoot language={language} />

			</section>);

		}

		return null;

	}
}
