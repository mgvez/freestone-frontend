import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import { WidgetField, FieldLabel, FieldDescription } from '../../../styles/Input';
import { Tooltip } from '../../../styles/Prompts';

import styled from 'styled-components';


const PreviewContainer = styled.div`
	margin: 0.7em 0;
	
	height: 25px;
	display: flex;
	align-items: center;
	position: relative;

	.preloader {
		position: relative;
		left: 0;
		width: 0;
	}
`;
const PreviewVal = styled.div`
	font-weight: bold;
	font-size: 1em;
	em {
		font-weight: normal;
	}
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
export default function RecordTitle({
	tableId,
	recordId,
	record,	
	fetchWorkingTitle,
	workingTitle,
	val,
	lang,
	changeVal,
	clearWorkingTitle,
}) {
	if (!tableId) return null;
	const [useDefault, setUseDefault] = useState(true);

	useEffect(() => {
		if (record && !workingTitle) {
			fetchWorkingTitle(tableId, lang, recordId, record, val);
		}
		if (val && useDefault) {
			setUseDefault(false);
		}
	}, [tableId, recordId, record, val, workingTitle]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			clearWorkingTitle(tableId, recordId, lang);
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
	if (workingTitle) {
		if (!workingTitle.error) {
			currentPreviewDisplay = (
				<PreviewVal>
					<em>Title Preview: </em>
					{workingTitle.value}
				</PreviewVal>
			);
		} else {
			currentPreviewError = (
				<Tooltip error>
					{workingTitle.error}
				</Tooltip>
			);
		}
	}

	const onOverride = () => {
		
		const willUseDefault = !useDefault;
		if (willUseDefault && val && !confirm('Are you sure you want to revert to the default title?')) return;

		setUseDefault(willUseDefault);
		// when reverting back to default, clear this field's val
		if (willUseDefault) {
			changeVal('');
			clearWorkingTitle(tableId, recordId, lang);
		} else {
			changeVal(workingTitle && (workingTitle.raw || workingTitle.value));
		}
	};
	return (
		<WidgetField>
			<FieldLabel>Title <em>(<span>{lang}</span>)</em></FieldLabel>
			<PreviewContainer>	
				{currentPreviewDisplay || (!currentPreviewError && <div className="preloader"><Preloader size={25} /></div>)}
			</PreviewContainer>
			<EditorContainer>
				{currentPreviewError}
				{!useDefault && (
					<TextInput val={val || ''} size={50} changeVal={onChangeVal} />
				)}
			</EditorContainer>
			<FunctionsContainer>
				<Button small onClick={onOverride}>{useDefault ? 'Edit' : 'Revert to default'}</Button>
			</FunctionsContainer>
			<FieldDescription>The title will be parsed as a Twig template</FieldDescription>
		</WidgetField>
	);

}

RecordTitle.propTypes = {
	val: PropTypes.string,
	lang: PropTypes.string,
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	workingTitle: PropTypes.shape({
		value: PropTypes.string,
		raw: PropTypes.string,
		error: PropTypes.string,
	}),
	fetchWorkingTitle: PropTypes.func,
	clearWorkingTitle: PropTypes.func,
	changeVal: PropTypes.func,
};
