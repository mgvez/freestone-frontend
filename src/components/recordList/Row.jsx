import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TweenMax } from '../../utils/Greensock';

import RecordInteractions from '../../containers/recordList/RecordInteractions';
import { createCells } from './row/createCells';
import { PRIKEY_ALIAS } from '../../freestone/schemaProps';

export default class Row extends Component {
	static propTypes = {
		table: PropTypes.object,
		fields: PropTypes.array,
		values: PropTypes.object,
		isLarge: PropTypes.bool,
		isHovering: PropTypes.bool,
		hasCustomOrder: PropTypes.bool,
		swappedRecords: PropTypes.object,

		handleHover: PropTypes.func,
		swapAnimated: PropTypes.func,
		fetchRecords: PropTypes.func,
	};

	constructor(props) {
		super(props);
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		this.state = {
			key: `${this.props.table}_${prikeyVal}`,
		};
	}

	componentDidUpdate() {
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		if (this.props.swappedRecords && this.props.swappedRecords.origin === prikeyVal.toString()) this.animate().then(this.props.swapAnimated);
	}

	animate = () => {

		const animation = this.animation = this.animation || new Promise((resolve) => {
			TweenMax.to(this.recordRow.children, 0.3, { backgroundColor: 'rgba(25, 170, 141)', onComplete: () => {
				this.animation = null;
				resolve();
			}, clearProps: 'background-color' });
		});
		return animation;
	}

	handleHover = () => {
		this.props.handleHover(this.props.values[PRIKEY_ALIAS]);
	}

	getInteractions() {
		return <RecordInteractions key={this.state.key} table={this.props.table} fields={this.props.fields} values={this.props.values} fetchRecords={this.props.fetchRecords} hasCustomOrder={this.props.hasCustomOrder} />;
	}

	renderSelfTree() {
		const { fields, values, table } = this.props;

		const breadcrumb = values.breadcrumb ? values.breadcrumb : '0';
		const level = values.level ? values.level : '0';
		// console.log(values);
		const interactions = this.getInteractions();
		if (this.props.isLarge) {
			const label = createCells(table, fields, values, 'span');

			return (
				<tr className={`level-${level}`} onMouseOver={this.handleHover}>
					<td key="cellBread" className="selfjoin-breadcrumb">{breadcrumb}</td>
					<td key="cellLabel" className="selfjoin-label">{label}</td>
					<td className="interactions">
						{interactions}
					</td>
				</tr>
			);
		}

		const content = createCells(table, fields, values, 'div', { className: 'mobile-cell' });
		return (
			<tr className="selfjoin-row">
				<td>
					{content}
				</td>
				<td className="interactions">
					{interactions}
				</td>
			</tr>
		);

	}

	renderRegular() {
		const { fields, values, table } = this.props;
		let content;
		const interactions = this.getInteractions();

		//ROW NORMAL, LARGE
		if (this.props.isLarge) {
			content = createCells(table, fields, values);

			return (
				<tr ref={(el) => { this.recordRow = el; }} onMouseOver={this.handleHover}>
					{content}
					<td className="interactions">
						{interactions}
					</td>
				</tr>
			);
		}

		//ROW NORMAL, MOBILE
		content = createCells(table, fields, values, 'div', { className: 'mobile-cell' });
		return (
			<tr>
				<td>
					{content}
				</td>
				<td className="interactions">
					{interactions}
				</td>
			</tr>
		);

	}

	render() {
		// console.log('render %s', this.props.values.prikey);
		// console.log(this.props.table);
		return this.props.table.isSelfTree ? this.renderSelfTree() : this.renderRegular();

	}
}
