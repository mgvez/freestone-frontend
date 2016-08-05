import React, { Component } from 'react';

import { RecordInteractions } from 'components/connected/recordList/RecordInteractions';
import { InfosFcn } from 'components/static/recordList/InfosFcn';
import { createCells } from 'components/static/recordList/row/createCells';
import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS, PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS } from 'freestone/schemaProps';

export class Row extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		fields: React.PropTypes.array,
		values: React.PropTypes.object,
		isLarge: React.PropTypes.bool,
		isHovering: React.PropTypes.bool,

		handleHover: React.PropTypes.func,
	};

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

	handleHover = () => {
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
					<td key="cellLabel" className="selfjoin-label">{label}</td>,
				];
			} else {
				content = this.getInteractions();
			}

			return (
				<tr className={`level-${level}`} onMouseOver={this.handleHover}>
					{content}
				</tr>
			);
		}
		
		/**
		 * @todo : Faire en sorte que ca marche avec le level ( Extender fields, values ??)
		 */
		content = createCells(fields, values, 'div', { className: 'mobile-cell' });
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
		const { fields, values } = this.props;
		let content;
		//ROW NORMAL, LARGE
		if (this.props.isLarge) {
			content = createCells(fields, values);

			return (
				<tr onMouseOver={this.handleHover}>
					<td className="infos">
						<InfosFcn
							prikey={values[PRIKEY_ALIAS]}
							lastmodifdate={values[LASTMODIF_DATE_ALIAS]}
							createddate={values[CREATED_DATE_ALIAS]}
							label={values[LABEL_PSEUDOFIELD_ALIAS]}
						/>
					</td>
					{content}
					<td className="interactions">
						<RecordInteractions table={this.props.table} fields={fields} values={values} />
					</td>
				</tr>
			);
		}

		//ROW NORMAL, MOBILE
		content = createCells(fields, values, 'div', { className: 'mobile-cell' });
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
