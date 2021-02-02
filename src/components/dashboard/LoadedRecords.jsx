import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import cssVariables from '../../styles/Variables';
import colors from '../../styles/Colors';
import { Heading2, Heading4 } from '../../styles/Texts';
import { NavLinkButton } from '../../styles/Button';
import { Icon } from '../../styles/Icon';

import { Scrollbars } from 'react-custom-scrollbars';

import LoadedRecordsToggler from '../../containers/widgets/LoadedRecordsToggler';
import Cancel from '../../containers/process/Cancel';
import { GridContainer, GridItem } from '../../styles/Grid';

function leftPad(n) {
	return n < 10 ? `0${n}` : n;
}

const StyledLoadedRecords = styled.nav`

	position: absolute;
		top: ${cssVariables.topHeaderHeight}px;
		right: 0;

	height: calc(100vh - 60px);
	width: ${cssVariables.recordsWidth}px;
	overflow: auto;
	padding: 40px 15px;
	background: ${colors.backgroundDark};
	color: ${colors.textSecondary};
	z-index: 20000;

	transition: transform 0.3s;

	&.sticky {
		position: fixed;
			top: 0;
			right: 0;
		height: 100vh;
	}

	.container {
		width: ${cssVariables.recordsWidth - 20}px;
		padding: 0 20px;
	}

	.record-group {
		margin-bottom: 40px;
	}

	.warning {
		color: ${colors.warnPrimary};
	}

	.loaded-record {
		line-height: 1.3;

		.info-record {
			margin-top: 5px;
			line-height: 1.3;
		} 

		.record-buttons {
			margin-top: 10px;
		}
	}


	

	&.collapsed {
		transform: translate(100%, 0);
	}
`;


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
		const isSticky = window.scrollY >= this.origOffset;
		if (isSticky !== this.state.isSticky) this.setState({ isSticky });
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
			<StyledLoadedRecords className={`${stickClass} ${collapsedClass}`} ref={ref => this.nav = ref}>
				<Scrollbars>
					<div className="container">
						<GridContainer>
							<GridItem columns="10">
								<Heading2>Loaded records</Heading2>
							</GridItem>
							<GridItem columns="2">
								<LoadedRecordsToggler isClose />
							</GridItem>
						</GridContainer>
						{
							this.props.records.map((records) => {
								if (!records.records || !records.table || !records.records.length) return null;
								return (
									<div className="record-group" key={records.tableId}>
										<Heading4>{records.table.displayLabel}</Heading4>
										{
											records.records.map(record => {

												const warnClass = record.isOutdated ? 'warning' : '';
												const outdatedWarning = (
													<div className={`${warnClass} info-record`}>
														This record has been open for {this.getTimeElapsed(record)}.
													</div>
												);

												return (
													<div className="loaded-record" key={`${records.tableId}_${record.id}`}>
														{record.label}
														{outdatedWarning}
														<div className="record-buttons">
															<NavLinkButton to={`/edit/${records.table.name}/${record.id}`} onClick={this.linkClick} round="true" warn="true"><Icon icon="pencil-alt" side="left" /><span> Edit</span></NavLinkButton>
															
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
			</StyledLoadedRecords>
		);
	}
}
