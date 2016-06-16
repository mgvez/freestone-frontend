import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';

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

		hasLanguageToggle: React.PropTypes.bool,
		table: React.PropTypes.object,
		lastmodifdate: React.PropTypes.string,
		
		//once saved/cancelled, we can override the defualt action (which is to go to table's list)
		finishCallback: React.PropTypes.func,
		fetchTable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		window.scrollTo(0, 0);
		this.requireData(this.props);

		this.setState({
			saving: false,
		});
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		const { tableName } = props.params;
		if (!props.table) this.props.fetchTable(tableName);
	}

	save = () => {
		this.setState({
			saving: true,
		});
	};

	render() {

		if (this.state.saving) {
			return <Save tableId={this.props.table.id} recordId={this.props.params.recordId} callback={this.props.finishCallback} />;
		}

		let header;
		let form;
		if (this.props.table) {
			
			const languageToggler = this.props.hasLanguageToggle ? (
				<LanguageToggler />
			) : null;

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
				<SingleRecord tableName={this.props.table.name} recordId={this.props.params.recordId} />
			);
		}
		return (
			<section className="root-form">
				{ header }
				{ form }
			</section>
		);
	}
}
