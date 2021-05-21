import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../inputTypes/TextInput';

import styled from 'styled-components';

const Widget = styled.div`
	margin-top: 10px;
	line-height: 1.2em;
	font-size: 0.8em;
	border: 1px black solid;
`;

const DEBOUNCE_DELAY = 500; // ms
export default function RecordSlug({
	tableId,
	recordId,
	record,	
	fetchWorkingSlug,
	val,
	lang,
	workingSlugs,
	changeVal,
	clearWorkingSlug,
	...props
}) {
	if (!tableId) return null;

	const [isDefaultOverride, setIsDefaultOverride] = useState(Boolean(val));

	useEffect(() => {
		let timeout;
		if (record && !workingSlugs) {
			timeout = setTimeout(() => {
				fetchWorkingSlug(tableId, recordId, record, val);
			}, DEBOUNCE_DELAY);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [tableId, recordId, record, val]);

	const onChangeVal = (a) => {
		clearWorkingSlug(tableId, recordId);
		changeVal(a);
	};

	// console.log(workingSlugs);

	const currentSlugCandidate = workingSlugs && workingSlugs.slug;
	// when doing custom slugs, there might be a part that is non-verridable, which is all the part that comes before the first slash preceding a field on the original table
	const nonOverridablePart = workingSlugs && workingSlugs.nonOverridable;

	const onOverride = () => {
		setIsDefaultOverride(!isDefaultOverride);
		// when reverting back to default, clear this field's val
		if (isDefaultOverride) {
			changeVal('');
			clearWorkingSlug(tableId, recordId);
		}
	};
	return (
		<Widget>
			<div>{`SLUGS record ${lang} ${tableId}.${recordId}`}</div>
			{currentSlugCandidate && <div>{currentSlugCandidate}</div>}
			{isDefaultOverride && (
				<div>
					<span>{nonOverridablePart}</span>
					<TextInput val={val || ''} size={100} changeVal={onChangeVal} />
				</div>
			)}
			<button onClick={onOverride}>{isDefaultOverride ? 'use default' : 'override default'}</button>

		</Widget>
	);

}

RecordSlug.propTypes = {
	val: PropTypes.string,
	lang: PropTypes.string,
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	workingSlugs: PropTypes.object,
	fetchWorkingSlug: PropTypes.func,
	clearWorkingSlug: PropTypes.func,
	changeVal: PropTypes.func,
};
