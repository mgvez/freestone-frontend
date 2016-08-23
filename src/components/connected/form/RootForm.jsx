import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import DocumentMeta from 'react-document-meta';

import { rootFormMapStateToProps } from 'selectors/rootForm';

import { Save } from 'components/connected/process/Save';
import { HeaderContainer } from 'components/static/header/HeaderContainer';
import { RecordHeader } from 'components/connected/form/header/RecordHeader';
import { SingleRecord } from 'components/connected/form/SingleRecord';

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

		let form;
		let meta;

		//langue peut être locale (si par ex. dans une modale) pour éviter les rerender des autres formulaires. Si présente en state, priorité sur store
		const language = this.state.language || this.props.language;

		if (this.props.table) {

			if (this.state.saving) {
				return <Save tableId={this.props.table.id} recordId={this.props.params.recordId} callback={this.props.finishCallback} cancelSave={this.cancelSave} />;
			}

			form = (
				<SingleRecord tableId={this.props.table.id} recordId={this.props.params.recordId} isRoot language={language} />
			);

			meta = <DocumentMeta title={`${this.props.table.displayLabel} : /${this.props.params.recordId}`} />;
		}

		const functions = {
			save: this.save,
			setLanguageState: this.setLanguageState,
		};

		return (
			<section className="root-form">
				{meta}
				<HeaderContainer>
					<RecordHeader {...this.props} functions={functions} />
					<RecordHeader isLight {...this.props} functions={functions} />
				</HeaderContainer>
				
				{form}
			</section>
		);
	}
}
