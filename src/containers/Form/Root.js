import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';

import { RequireApiData } from 'containers/common/RequireApiData';
import { tableSchemaSelector } from 'selectors/TableSchema';

import { SingleRecord } from 'containers/Form/SingleRecord';

@connect(
	tableSchemaSelector,
	dispatch => bindActionCreators(schemaActionCreators, dispatch)
)
export class RootForm extends Component {
	static propTypes = {
		params: React.PropTypes.object,
		table: React.PropTypes.object,
		fetchTable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
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
					<button>Save</button>
					<button>Cancel</button>
					<div>lastmodif</div>
				</header>
			);
			form = (
				<SingleRecord params={this.props.params} />
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
