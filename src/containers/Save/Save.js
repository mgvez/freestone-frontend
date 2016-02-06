import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as saveActionCreators from 'actions/save';

import { saveRecordSelector } from 'selectors/BuildRecordForSave';

@connect(
	saveRecordSelector,
	dispatch => bindActionCreators(saveActionCreators, dispatch)
)
export class Save extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		table: React.PropTypes.object,
		record: React.PropTypes.object,

		saveRecord: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log(this.props);
	}

	componentWillReceiveProps(nextProps) {
	}

	render() {
		
		return (
			<section>
				Saving...
			</section>
		);
	}
}
