import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleLoadedRecords } from 'actions/siteHeader';
import { loadedRecordsStatusSelector } from 'selectors/loadedRecordsStatus';

@connect(
	loadedRecordsStatusSelector,
	dispatch => bindActionCreators({ toggleLoadedRecords }, dispatch)
)
export class LoadedRecordsToggler extends Component {
	static propTypes = {
		nLoadedRecords: React.PropTypes.number,
		toggleLoadedRecords: React.PropTypes.func,
		loaded_records_visibility: React.PropTypes.bool,
		isClose: React.PropTypes.bool,
	};

	loadedRecordsToggler = () => {
		const isFirstTime = this.props.loaded_records_visibility === undefined;
		const visibility = isFirstTime ? true : !this.props.loaded_records_visibility;

		this.props.toggleLoadedRecords(visibility);
	};

	render() {
		const className = !this.props.isClose ? 'fa-close' : 'fa-pencil';
		return (<div className="loaded-records-toggler" onClick={this.loadedRecordsToggler} data-num={this.props.nLoadedRecords}>
			<i className={`fa ${className}`}></i>
		</div>);
	}
}
