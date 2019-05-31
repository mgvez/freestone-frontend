import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DeleteBtn extends Component {
	static propTypes = {
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		deleteRecord: PropTypes.func,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			requested: false,
		};
	}

	cancel = (e) => {
		e.stopPropagation();

		this.setState({
			requested: false,
		});
	}

	process = (e) => {
		e.stopPropagation();
		if (this.state.requested) {
			this.props.deleteRecord(this.props.tableName, this.props.prikey);
		} else {
			this.setState({
				requested: true,
			});
		}
	};

	render() {

		if (this.state.requested) {
			return (
				<div className="record-action prompt">
					<div onClick={this.process}><i className="fa fa-close"></i>Confirm</div>
					<div onClick={this.cancel}><i className="fa fa-undo"></i>Cancel</div>
				</div>
			);
		}

		return (
			<div className={this.props.className || 'record-action red'} onClick={this.process}><i className="fa fa-close"></i>Delete</div>
		);
	}
}
