import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TweenMax } from '../../../utils/Greensock';

import RecordInteractions from '../../../containers/recordList/RecordInteractions';
import { getFieldElements } from './getFieldElements';
import { PRIKEY_ALIAS } from '../../../freestone/schemaProps';

const SelfjoinContentCell = styled.td`
	.level-1 & {
		padding-left: 0px;
	}
	.level-2 & {
		padding-left: 20px;
	}
	.level-3 & {
		padding-left: 40px;
	}
	.level-4 & {
		padding-left: 60px;
	}
`;

const Interaction = styled.td`
	width: 200px;
`;


export default function Row(props) {
	if (!props.values) return null;

	const prikeyVal = props.values && props.values[PRIKEY_ALIAS];
	const recordRow = useRef();
	const animationRef = useRef();
	const { fields, values, table, hasCustomOrder, isLarge, isQuickEdit, quickeditedRecord } = props;
	const rowClass = isQuickEdit && quickeditedRecord ? 'edited' : null;

	const animate = () => {
		const animation = animationRef.current = animationRef.current || new Promise((resolve) => {
			TweenMax.to(recordRow.current.children, 0.3, { backgroundColor: 'rgba(25, 170, 141)', onComplete: () => {
				animationRef.current = null;
				resolve();
			}, clearProps: 'background-color' });
		});
		return animation;
	};

	useEffect(() => {
		if (props.swappedRecords && props.swappedRecords.origin === prikeyVal.toString()) animate().then(props.swapAnimated);
	});
	
	const handleHover = () => {
		props.handleHover(props.values[PRIKEY_ALIAS]);
	};

	const getInteractions = () => {
		return !isQuickEdit && (
			<Interaction>
				<RecordInteractions
					table={table}
					fields={fields}
					values={values}
					hasCustomOrder={hasCustomOrder}
				/>
			</Interaction>
		);
	};

	const renderSelfTree = () => {

		const breadcrumb = values.breadcrumb ? values.breadcrumb : '0';
		const level = values.level ? values.level : '0';
		// console.log(values);
		const interactions = getInteractions();
		if (isLarge) {
			const label = getFieldElements(table, fields, values, isQuickEdit, 'span');

			return (
				<tr className={`level-${level}`} onMouseOver={handleHover} ref={recordRow}>
					<td key="cellBread" className="selfjoin-breadcrumb">{breadcrumb}</td>
					<SelfjoinContentCell key="cellLabel" className="selfjoin-label">{label}</SelfjoinContentCell>
					{interactions}
				</tr>
			);
		}

		const content = getFieldElements(table, fields, values, isQuickEdit, 'div', { className: 'mobile-cell' });
		return (
			<tr className="selfjoin-row" ref={recordRow}>
				<td>
					{content}
				</td>
				{interactions}
			</tr>
		);

	};

	const renderRegular = () => {
		let content;
		const interactions = getInteractions();

		//ROW NORMAL, LARGE
		if (isLarge) {
			content = getFieldElements(table, fields, values, isQuickEdit);

			return (
				<tr ref={recordRow} onMouseOver={handleHover} className={rowClass}>
					{content}
					{interactions}
				</tr>
			);
		}

		//ROW NORMAL, MOBILE
		content = getFieldElements(table, fields, values, isQuickEdit, 'div', { className: 'mobile-cell' });
		return (
			<tr ref={recordRow} className={rowClass}>
				<td>
					{content}
				</td>
				{interactions}
			</tr>
		);

	};

	return props.table.isSelfTree ? renderSelfTree() : renderRegular();
}


Row.propTypes = {
	table: PropTypes.object,
	fields: PropTypes.array,
	values: PropTypes.object,
	isLarge: PropTypes.bool,
	isQuickEdit: PropTypes.bool,
	isHovering: PropTypes.bool,
	hasCustomOrder: PropTypes.bool,
	swappedRecords: PropTypes.object,
	quickeditedRecord: PropTypes.object,

	handleHover: PropTypes.func,
	swapAnimated: PropTypes.func,
};
