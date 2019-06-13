import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../styles/Button';
import { RecordAction } from '../../styles/RecordActions';

export default class DuplicateBtn extends Component {
	static propTypes = {
		isButton: PropTypes.bool,
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		duplicateRecord: PropTypes.func,
	};

	process = () => {
		this.props.duplicateRecord(this.props.tableName, this.props.prikey);
	};

	render() {		
		return this.props.isButton ? (
			<Button warn="true" onClick={this.process}><i className="fa fa-clone"></i>Duplicate</Button>
		) : (
			<RecordAction warn="true" onClick={this.process}><i className="fa fa-clone"></i>Duplicate</RecordAction>
		);
	}
}
