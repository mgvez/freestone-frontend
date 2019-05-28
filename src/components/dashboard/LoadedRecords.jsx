import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import LoadedRecordsToggler from '../../containers/widgets/LoadedRecordsToggler';
import Cancel from '../../containers/process/Cancel';

function leftPad(n) {
	return n < 10 ? `0${n}` : n;
}

export default class LoadedRecords extends Component {
	static propTypes = {
		fetchTable: PropTypes.func,
		fetchForeignLabel: PropTypes.func,
		toggleLoadedRecords: PropTypes.func,

		records: PropTypes.array,
		unloadedForeignLabels: PropTypes.array,
		toggleState: PropTypes.object,
		visible: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.origOffset = null;
		this.state = { isSticky: false };
	}
		
	componentDidMount() {
		this.requireData(this.props);
		window.addEventListener('scroll', this.stick);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.stick);
	}

	getMinutes = (record) => {
		const minutes = parseInt(record.hasBeenOpenedFor / 60, 10);
		return minutes === 0 ? '' : `${minutes}m`;
	}

	getSeconds = (record) => {
		const seconds = leftPad(parseInt(record.hasBeenOpenedFor % 60, 10));
		return seconds === '00' ? '' : `${seconds}s`;
	}

	getTimeElapsed = (record) => {
		return this.getMinutes(record) + this.getSeconds(record);
	}

	requireData(props) {
		if (props.records) {
			props.records.filter(records => !records.table).forEach(records => {
				this.props.fetchTable(records.tableId);
			});
		}
		if (props.unloadedForeignLabels) {
			// console.log(props.records);
			props.unloadedForeignLabels.forEach(unloadedForeignLabel => {
				// console.log('fetch', unloadedForeignLabel.fieldId, unloadedForeignLabel.foreignRecordId);
				this.props.fetchForeignLabel(unloadedForeignLabel.fieldId, unloadedForeignLabel.foreignRecordId);
			});
		}
	}

	stick = () => {
		this.origOffset = this.origOffset || (this.nav && this.nav.offsetTop);
		this.setState({ isSticky: window.scrollY >= this.origOffset });
	}

	linkClick = () => {
		this.props.toggleLoadedRecords(false);
	}

	render() {
		// console.log('%cRender menu', 'font-weight: bold');
		// console.log(this.props.tree);

		if (!this.props.records) return null;

		const stickClass = this.state.isSticky ? 'sticky' : '';
		const collapsedClass = this.props.visible ? '' : 'collapsed';

		return (
			<nav className={`loaded-records ${stickClass} ${collapsedClass}`} ref={ref => this.nav = ref}>
				<Scrollbars>
					<div className="container">
						<LoadedRecordsToggler isClose />
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
															<NavLink to={`/edit/${records.table.name}/${record.id}`} onClick={this.linkClick} activeClassName="active" className="button-round-warn"><i className="fa fa-pencil"></i><span> Edit</span></NavLink>
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
					</div>
				</Scrollbars>
			</nav>
		);
	}
}
