import React, { Component } from 'react';

export default class DuplicateBtn extends Component {
	static propTypes = {
		prikey: React.PropTypes.string,
		tableName: React.PropTypes.string,
		duplicateRecord: React.PropTypes.func,
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
