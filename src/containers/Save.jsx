import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as saveActionCreators from 'actions/save';
import { goTo } from 'actions/nav';

import { saveSelector } from 'selectors/save';

@connect(
	saveSelector,
	dispatch => bindActionCreators({ ...saveActionCreators, goTo }, dispatch)
)
export class Save extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		table: React.PropTypes.object,
		tree: React.PropTypes.object,
		records: React.PropTypes.object,
		deleted: React.PropTypes.object,
		fields: React.PropTypes.array,
		saveState: React.PropTypes.object,
		backPath: React.PropTypes.object,

		saveRecord: React.PropTypes.func,
		sendFile: React.PropTypes.func,
		goTo: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// console.log('MOUNT', this.props.records, this.props.deleted);
		const onSaved = this.props.saveRecord(this.props.params.tableName, this.props.tree, this.props.records, this.props.deleted);

		if (onSaved) {
			onSaved.then(() => {
				const backPath = this.props.backPath || { path: `list/${this.props.params.tableName}` };
				setTimeout(() => this.props.goTo(backPath), 2000);
			});
		}

	}

	render() {
		// console.log(this.props.saveState);
		return (
			<section>
				Saving...
				{
					Object.keys(this.props.saveState.files).map(tmpName => {
						const curPrc = this.props.saveState.files[tmpName];
						return <div key={tmpName}>Saving {tmpName} : {curPrc}%</div>;
					})
				}
				<div>{this.props.saveState.status.msg}</div>
			</section>
		);
	}
}
