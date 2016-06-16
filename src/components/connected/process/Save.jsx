import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveRecord } from 'actions/save';
import { goTo } from 'actions/nav';

import { buildSaveRecordSelector } from 'selectors/buildRecord';

@connect(
	buildSaveRecordSelector,
	dispatch => bindActionCreators({ saveRecord, goTo }, dispatch)
)
export class Save extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,

		table: React.PropTypes.object,
		tree: React.PropTypes.object,
		records: React.PropTypes.object,
		deleted: React.PropTypes.object,
		fields: React.PropTypes.array,
		saveState: React.PropTypes.object,

		callback: React.PropTypes.func,
		saveRecord: React.PropTypes.func,
		goTo: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// console.log('MOUNT', this.props.records, this.props.deleted);
		const onSaved = this.props.saveRecord(this.props.table, this.props.tree, this.props.records, this.props.deleted);

		if (onSaved) {
			onSaved.then(() => {
				if (this.props.callback) {
					this.props.callback();
				} else {
					const backPath = { path: `list/${this.props.table.name}` };
					setTimeout(() => this.props.goTo(backPath), 1000);
				}
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
