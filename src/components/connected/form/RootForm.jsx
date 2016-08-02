import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import DocumentMeta from 'react-document-meta';

import { rootFormMapStateToProps } from 'selectors/rootForm';

import { Save } from 'components/connected/process/Save';
import { Cancel } from 'components/connected/process/Cancel';
import { Header } from 'components/static/form/Header';
import { SingleRecord } from 'components/connected/form/SingleRecord';
import { LanguageToggler } from 'components/connected/form/LanguageToggler';

@connect(
	rootFormMapStateToProps,
	dispatch => bindActionCreators(schemaActionCreators, dispatch)
)
export class RootForm extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			recordId: React.PropTypes.string,
		}),

		isModal: React.PropTypes.bool,
		language: React.PropTypes.string,
		hasLanguageToggle: React.PropTypes.bool,
		table: React.PropTypes.object,
		lastmodifdate: React.PropTypes.string,
		
		//once saved/cancelled, we can override the defualt action (which is to go to table's list)
		finishCallback: React.PropTypes.func,
		fetchTable: React.PropTypes.func,
	};

	componentWillMount() {
		
		if (!this.props.isModal) {
			window.scrollTo(0, 0);
		}

		this.requireData(this.props);

		this.setState({
			saving: false,
			language: null,
		});
	}

	componentWillReceiveProps(nextProps) {
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

	save = () => {
		this.setState({
			saving: true,
		});
	}
	
	cancelSave = () => {
		this.setState({
			saving: false,
		});
	}

	requireData(props) {
		const { tableName } = props.params;
		if (!props.table) this.props.fetchTable(tableName);
	}

	render() {

		let header;
		let form;
		let meta;

		//langue peut être locale (si par ex. dans une modale) pour éviter les rerender des autres formulaires. Si présente en state, priorité sur store
		const language = this.state.language || this.props.language;

		if (this.props.table) {
			
			if (this.state.saving) {
				return <Save tableId={this.props.table.id} recordId={this.props.params.recordId} callback={this.props.finishCallback} cancelSave={this.cancelSave} />;
			}

			let languageToggler;
			if (this.props.hasLanguageToggle) {
				languageToggler = <LanguageToggler onChangeLang={this.props.isModal ? this.setLanguageState : null} localLanguage={language} />;
			}

			header = (
				<header>
					<div className="texts">
						<Header table={this.props.table} />
						<div className="last-modif-date">Last modification : {this.props.lastmodifdate}</div>
					</div>

					<div className="btns">
						<a onClick={this.save} className="button-round">Save</a>
						<Cancel tableName={this.props.table.name} recordId={this.props.params.recordId} callback={this.props.finishCallback} />
					</div>
					{languageToggler}
				</header>
			);

			form = (
				<SingleRecord tableId={this.props.table.id} recordId={this.props.params.recordId} isRoot language={language} />
			);

			meta = <DocumentMeta title={`${this.props.table.displayLabel} : /${this.props.params.recordId}`} />;
		}
		return (
			<section className="root-form">
				{meta}
				{header}
				{form}
			</section>
		);
	}
}
