import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadedRecordsToggler extends Component {
	static propTypes = {
		nLoadedRecords: PropTypes.number,
		toggleLoadedRecords: PropTypes.func,
		loaded_records_visibility: PropTypes.bool,
		isClose: PropTypes.bool,
	};

	loadedRecordsToggler = () => {
		const isFirstTime = this.props.loaded_records_visibility === undefined;
		const visibility = isFirstTime ? true : !this.props.loaded_records_visibility;

		this.props.toggleLoadedRecords(visibility);
	};

	render() {
		const className = this.props.isClose ? 'fa-close' : 'fa-pencil';
		const buttonClassName = this.props.isClose ? 'button-circle-small' : '';


		return (<div className={`${buttonClassName} loaded-records-toggler `} onClick={this.loadedRecordsToggler} data-num={this.props.nLoadedRecords}>
			<i className={`fa ${className}`}></i>
		</div>);
	}
}
