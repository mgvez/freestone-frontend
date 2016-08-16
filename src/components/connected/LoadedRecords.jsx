import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LoadedRecordsToggler } from 'components/connected/widgets/LoadedRecordsToggler';

import { fetchTable } from 'actions/schema';
import { fetchForeignOptions } from 'actions/foreignOptions';
import { loadedRecords } from 'selectors/loadedRecords';

import { Cancel } from 'components/connected/process/Cancel';

@connect(
	loadedRecords,
	dispatch => bindActionCreators({ fetchTable, fetchForeignOptions }, dispatch)
)
export class LoadedRecords extends Component {
	static propTypes = {
		fetchTable: React.PropTypes.func,
		fetchForeignOptions: React.PropTypes.func,

		records: React.PropTypes.array,
		unloadedForeignOptions: React.PropTypes.array,
		toggleState: React.PropTypes.object,
		visible: React.PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.origOffset = null;
		this.state = { isSticky: false };
	}

	componentWillMount() {
		this.requireData(this.props);
		window.addEventListener('scroll', this.stick);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.stick);
	}

	getMinutes = (record) => {
		const minutes = parseInt(record.hasBeenOpenedFor / 60, 10);
		return minutes === 0 ? '' : `${minutes}m`;
	}

	getSeconds = (record) => {
		const seconds = this.leftPad(parseInt(record.hasBeenOpenedFor % 60, 10));
		return seconds === '00' ? '' : `${seconds}s`;
	}

	getTimeElapsed = (record) => {
		return this.getMinutes(record) + this.getSeconds(record);
	}

	leftPad = (n) => {
		return n < 10 ? `0${n}` : n;
	}

	requireData(props) {
		// console.log(props);
		if (props.records) {
			props.records.filter(records => !records.table).forEach(records => {
				this.props.fetchTable(records.tableId);
			});
		}
		if (props.unloadedForeignOptions) {
			props.unloadedForeignOptions.forEach(unloadedForeignOption => {
				this.props.fetchForeignOptions(unloadedForeignOption);
			});
		}
	}

	stick = () => {
		this.origOffset = this.origOffset || (this.nav && this.nav.offsetTop);
		this.setState({ isSticky: window.scrollY >= this.origOffset });
	}

	render() {
		// console.log('%cRender menu', 'font-weight: bold');
		// console.log(this.props.tree);

		if (!this.props.records) return null;

		const stickClass = this.state.isSticky ? 'sticky' : '';
		const collapsedClass = this.props.visible ? '' : 'collapsed';

		return (
			<nav className={`loaded-records ${stickClass} ${collapsedClass}`} ref={ref => this.nav = ref}>
				<LoadedRecordsToggler />
				<h2>Loaded records</h2>
				{
					this.props.records.map((records) => {
						if (!records.records || !records.table || !records.records.length) return null;
						return (
							<div className="record-group" key={records.tableId}>
								<h3 className="record-label">{records.table.displayLabel}</h3>
								{
									records.records.map(record => {

										const warnClass = record.isOutdated ? 'warn' : '';
										const outdatedWarning = (
											<div className={warnClass}>
												This record has been open for {this.getTimeElapsed(record)}.
											</div>
										);

										return (
											<div className="loaded-record" key={`${records.tableId}_${record.id}`}>
												{record.label}
												{outdatedWarning}
												<div className="record-buttons">
													<Link to={`/edit/${records.table.name}/${record.id}`} activeClassName="active" className="button-round-warn"><i className="fa fa-pencil"></i><span> Edit</span></Link>
													<Cancel tableName={records.table.name} recordId={record.id} />
												</div>
											</div>
										);
									})
								}
							</div>
						);
					})
				}
			</nav>
		);
	}
}
