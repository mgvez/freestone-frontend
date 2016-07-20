import React, { Component } from 'react';

import { RecordInteractions } from 'components/static/recordList/RecordInteractions';
import { createCells } from 'components/static/recordList/row/createCells';
import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { PRIKEY_ALIAS } from 'freestone/schemaProps';

export class Row extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		fields: React.PropTypes.array,
		values: React.PropTypes.object,
		isLarge: React.PropTypes.bool,
		isHovering: React.PropTypes.bool,

		handleHover: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isHovering !== this.props.isHovering
			|| nextProps.isLarge !== this.props.isLarge
			|| nextProps.values !== this.props.values;
	}
	
	getInteractions() {
		return (<td colSpan="20">
			<RecordInteractions table={this.props.table} fields={this.props.fields} values={this.props.values} />
		</td>);
	}

	handleHover = (e) => {
		this.props.handleHover(this.props.values[PRIKEY_ALIAS]);
	}

	renderSelfTree() {
		const { fields, values } = this.props;
		let content;

		const breadcrumb = values.breadcrumb ? values.breadcrumb : '0';
		const level = values.level ? values.level : '0';

		if (this.props.isLarge) {
			if (!this.props.isHovering) {
				const label = createCells(fields, values, 'span');
				content = [
					<td key="cellBread" className="selfjoin-breadcrumb">{breadcrumb}</td>,
					<td key="cellLabel" className="selfjoin-label">{ label }</td>,
				];
			} else {
				content = this.getInteractions();
			}

			return (
				<tr onMouseOver={this.handleHover}>
					{ content }
				</tr>
			);
		}

		content = createCells(fields, values, 'span');
		return (
			<tr className={`selfjoin-row level-${level}`}>
				<td className="selfjoin-breadcrumb">{breadcrumb}</td>
				<td className="selfjoin-label">
					{ content }
				</td>
				<td>
					<RecordInteractions table={this.props.table} fields={fields} values={values} />
				</td>
			</tr>
		);

	}

	renderRegular() {
		const { fields, values } = this.props;
		let content;
		//ROW NORMAL, LARGE
		if (this.props.isLarge) {

			if (!this.props.isHovering) {
				content = createCells(fields, values);
			} else {
				content = this.getInteractions();
			}

			return (
				<tr onMouseOver={this.handleHover}>
					{ content }
				</tr>
			);
		}

		//ROW NORMAL, MOBILE
		content = createCells(fields, values);
		return (
			<tr>
				{ content }
				<td>
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
