import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';

import { rootFormMapStateToProps } from 'selectors/rootForm';

import { Save } from 'components/connected/process/Save';
import { Header } from 'components/static/form/Header';
import { SingleRecord } from 'components/connected/form/SingleRecord';

@connect(
	rootFormMapStateToProps,
	dispatch => bindActionCreators(schemaActionCreators, dispatch)
)
export class RootForm extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		table: React.PropTypes.object,
		lastmodifdate: React.PropTypes.string,
		
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
		let header;
		let form;
		if (this.props.table) {
			
			header = (
				<header>
					<a onClick={this.save} className="btn btn-xs btn-primary">Save</a>
					<Link to={`/cancel/${this.props.table.name}/${this.props.params.recordId}`} className="btn btn-xs btn-danger">Cancel</Link>

					<div>lastmodif {this.props.lastmodifdate}</div>
					<Header table={this.props.table} />
				</header>
			);

			form = (
				<SingleRecord tableName={this.props.params.tableName} recordId={this.props.params.recordId} />
			);
		}
		return (
			<section>
				{ header }
				{ form }
			</section>
		);
	}
}
