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

		handleHover: PropTypes.func,
		swappedRecords: PropTypes.array,
		swapAnimated: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			isAnimating: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		if (~nextProps.swappedRecords.indexOf(prikeyVal.toString()) && !this.state.isAnimating) {
			this.setState({
				isAnimating: true,
			});

			this.animate().then(this.props.swapAnimated);
		}
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.isHovering !== this.props.isHovering
			|| nextProps.isLarge !== this.props.isLarge
			|| nextProps.values !== this.props.values;
	}

	getInteractions() {
		return (<td colSpan="20" className="interactions">
			<RecordInteractions table={this.props.table} fields={this.props.fields} values={this.props.values} />
		</td>);
	}

	animate = () => {
		return new Promise((resolve) => {
			TweenMax.to(this.recordRow.children, 0.3, { backgroundColor: 'rgba(25, 170, 141)', repeat: 1, yoyo: true, onComplete: () => {
				this.setState({
					isAnimating: false,
				});
				resolve();
			}, clearProps: 'background-color' });
		});
	}

	handleHover = () => {
		this.props.handleHover(this.props.values[PRIKEY_ALIAS]);
	}

	renderSelfTree() {
		const { fields, values, table } = this.props;

		const breadcrumb = values.breadcrumb ? values.breadcrumb : '0';
		const level = values.level ? values.level : '0';
		// console.log(values);

		if (this.props.isLarge) {
			const label = createCells(table, fields, values, 'span');

			return (
				<tr className={`level-${level}`} onMouseOver={this.handleHover}>
					<td key="cellBread" className="selfjoin-breadcrumb">{breadcrumb}</td>
					<td key="cellLabel" className="selfjoin-label">{label}</td>
					<td className="interactions">
						<RecordInteractions table={this.props.table} fields={fields} values={values} />
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
					<RecordInteractions table={this.props.table} fields={fields} values={values} />
				</td>
			</tr>
		);

	}

	renderRegular() {
		const { fields, values, table } = this.props;
		let content;
		//ROW NORMAL, LARGE
		if (this.props.isLarge) {
			content = createCells(table, fields, values);

			return (
				<tr ref={(el) => { this.recordRow = el; }} onMouseOver={this.handleHover}>
					{content}
					<td className="interactions">
						<RecordInteractions table={this.props.table} fields={fields} values={values} />
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
					<RecordInteractions table={this.props.table} fields={fields} values={values} />
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
