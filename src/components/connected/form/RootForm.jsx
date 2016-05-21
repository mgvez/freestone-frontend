import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';

import { RequireApiData } from 'utils/RequireApiData';
import { rootFormMapStateToProps } from 'selectors/rootForm';

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
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		window.scrollTo(0, 0);
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		const { tableName } = props.params;
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
	}

	render() {
		let header;
		let form;
		if (this.props.table) {
			
			header = (
				<header>
					<Link to={`/save/${this.props.table.name}/${this.props.params.recordId}`} className="btn btn-xs btn-primary">Save</Link>
					<Link to={`/cancel/${this.props.table.name}/${this.props.params.recordId}`} className="btn btn-xs btn-danger">Cancel</Link>

					<div>lastmodif {this.props.lastmodifdate}</div>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
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
