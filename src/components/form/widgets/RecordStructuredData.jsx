import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import { WidgetField, FieldLabel, FieldDescription } from '../../../styles/Input';
import { Tooltip } from '../../../styles/Prompts';


const PreviewContainer = styled.div`
	height: 200px;

	.preloader {
		position: relative;
		left: 50%;
		top: 50%;
		width: 0;
	}
`;
const PreviewVal = styled.pre`
	padding: 1em;
	margin-top: -1px;
	font-size: 1em;
	height: 200px;
	overflow: scroll;
	border: 1px ${colors.borderFormAccent} solid;
`;

const FunctionsContainer = styled.div`
	margin: 0 0 10px 0;
`;

const EditorContainer = styled.div`
	margin: 0.7em 0;
	display: flex;
	align-items: center;
	position: relative;
	font-size: 1em;
	
`;

const DEBOUNCE_DELAY = 500; // ms
export default function RecordStructuredData({
	tableId,
	recordId,
	record,	
	fetchWorkingStructured,
	workingStructured,
	val,
	lang,
	changeVal,
	clearWorkingStructured,
}) {
	if (!tableId) return null;
	const [useDefault, setUseDefault] = useState(true);

	useEffect(() => {
		if (record && !workingStructured) {
			fetchWorkingStructured(tableId, lang, recordId, record, val);
		}
		if (val && useDefault) {
			setUseDefault(false);
		}
	}, [tableId, recordId, record, val, workingStructured]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			clearWorkingStructured(tableId, recordId, lang);
		}, DEBOUNCE_DELAY);
		return () => {
			clearTimeout(timeout);
		};
	}, [tableId, recordId, record, val]);

	const onChangeVal = (a) => {
		changeVal(a);
	};

	let currentPreviewDisplay;
	let currentPreviewError;
	if (workingStructured) {
		if (!workingStructured.error) {
			currentPreviewDisplay = (
				<PreviewVal>
					{workingStructured.value}
				</PreviewVal>
			);
		} else {
			currentPreviewError = (
				<Tooltip error>
					{workingStructured.error}
				</Tooltip>
			);
		}
	}

	const onOverride = () => {
		
		const willUseDefault = !useDefault;
		if (willUseDefault && val && !confirm('Are you sure you want to revert to the default value?')) return;

		setUseDefault(willUseDefault);
		// when reverting back to default, clear this field's val
		if (willUseDefault) {
			changeVal('');
			clearWorkingStructured(tableId, recordId, lang);
		} else {
			changeVal(workingStructured && (workingStructured.raw || workingStructured.value));
		}
	};
	return (
		<WidgetField>
			<FieldLabel>Structured data / Dynamic metas <em>(<span>{lang}</span>)</em></FieldLabel>
			<PreviewContainer>	
				{currentPreviewDisplay || (!currentPreviewError && <div className="preloader"><Preloader size={25} /></div>)}
			</PreviewContainer>
			<EditorContainer>
				{currentPreviewError}
				{!useDefault && (
					<TextInput val={val || ''} size={500} changeVal={onChangeVal} />
				)}
			</EditorContainer>
			<FunctionsContainer>
				<Button small onClick={onOverride}>{useDefault ? 'Edit' : 'Revert to default'}</Button>
			</FunctionsContainer>
			{!useDefault && <FieldDescription>The value will be parsed as a Twig template</FieldDescription>}
		</WidgetField>
	);

}

RecordStructuredData.propTypes = {
	val: PropTypes.string,
	lang: PropTypes.string,
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	workingStructured: PropTypes.shape({
		value: PropTypes.string,
		raw: PropTypes.string,
		error: PropTypes.string,
	}),
	fetchWorkingStructured: PropTypes.func,
	clearWorkingStructured: PropTypes.func,
	changeVal: PropTypes.func,
};
