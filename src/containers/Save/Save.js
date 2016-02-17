import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as saveActionCreators from 'actions/save';

import { saveSelector } from 'selectors/Save';

@connect(
	saveSelector,
	dispatch => bindActionCreators(saveActionCreators, dispatch)
)
export class Save extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		table: React.PropTypes.object,
		record: React.PropTypes.object,
		fields: React.PropTypes.array,
		fileInputIds: React.PropTypes.array,
		saveState: React.PropTypes.object,

		saveRecord: React.PropTypes.func,
		sendFile: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log(this.props);
		this.props.saveRecord(this.props.params.tableName, this.props.record, this.props.fileInputIds);
	}

	componentWillReceiveProps(nextProps) {
	}

	render() {
		console.log(this.props.saveState);
		return (
			<section>
				Saving...
				{
					Object.keys(this.props.saveState.files).map(tmpName => {
						const curPrc = this.props.saveState.files[tmpName];
						return <div>Saving {tmpName} : {curPrc}%</div>;
					})
				}
			</section>
		);
	}
}
