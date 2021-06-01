import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../styles/Icon';

export default class SaveLivePreview extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		afterSaveLocation: PropTypes.object,

		table: PropTypes.object,
		tree: PropTypes.object,
		records: PropTypes.object,
		deleted: PropTypes.object,
		fields: PropTypes.array,
		saveState: PropTypes.object,

		saveRecord: PropTypes.func,
		callback: PropTypes.func,
	};

	componentDidMount() {
		this.props.saveRecord(this.props.table, this.props.tree, this.props.records, this.props.deleted, null, true, null, this.props.callback);
	}

	render() {
		// console.log(this.props.saveState);
		return (
			<Icon icon="save" fw />
		);
	}
}
