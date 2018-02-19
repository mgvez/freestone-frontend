import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DuplicateBtn extends Component {
	static propTypes = {
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		duplicateRecord: PropTypes.func,
	};

	process = () => {
		this.props.duplicateRecord(this.props.tableName, this.props.prikey);
	};

	render() {		
		return (
			<div className="record-action yellow" onClick={this.process}><i className="fa fa-clone"></i>Duplicate</div>
		);
	}
}
