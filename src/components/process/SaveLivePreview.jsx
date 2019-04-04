import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SaveLivePreview extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		afterSaveLocation: PropTypes.string,

		table: PropTypes.object,
		tree: PropTypes.object,
		records: PropTypes.object,
		deleted: PropTypes.object,
		fields: PropTypes.array,
		saveState: PropTypes.object,

		callback: PropTypes.func,
		saveRecord: PropTypes.func,
		cancelSave: PropTypes.func,
	};

	componentDidMount() {
		// console.log(this.props.tree);
		// console.log(this.props.records);
		// console.log('MOUNT', this.props.records, this.props.deleted);
		//callback has priority over afterSaveLocation. If a callback is present, it will execute instead of redirecting to the location.
		this.props.saveRecord(this.props.table, this.props.tree, this.props.records, this.props.deleted, null, true, null, this.props.callback);
	}

	render() {
		// console.log(this.props.saveState);
		return (
			<div>saving...</div>
		);
	}
}
