import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import { StyledField, FieldLabel, FieldDescription } from '../../../styles/Input';
import { PromptWidget, Tooltip } from '../../../styles/Prompts';
import { WarningMessage } from '../../../styles/Texts';

import styled from 'styled-components';

const Widget = styled.div`
	padding: 10px;
	margin: 0 0 0.7em;
	background: ${colors.backgroundMainAccent};
	border: 1px ${colors.borderForm} solid;
`;

const PreviewUrlContainer = styled.div`
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
const PreviewUrl = styled.div`
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
	.inputContainer {
		input {
			margin: 0 0 0 5px;
		}
	}
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
		let timeout;
		if (record && !workingTitle) {
			timeout = setTimeout(() => {
				fetchWorkingTitle(tableId, lang, recordId, record, val);
			}, DEBOUNCE_DELAY);
		}
		if (val && useDefault) {
			setUseDefault(false);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [tableId, recordId, record, val, workingTitle]);

	const onChangeVal = (a) => {
		clearWorkingTitle(tableId, recordId, lang);
		changeVal(a);
	};

	// if the preview slug was not avaliable directly, warn the user that the orginal slug was not available
	const currentTitleDisplay = workingTitle && (
		<PreviewUrl>
			<em>Title Preview: </em>
			{workingTitle}
		</PreviewUrl>
	);

	const onOverride = () => {
		
		const newUseDefault = !useDefault;
		if (newUseDefault && val && !confirm('Are you sure you want to revert to the default title?')) return;

		setUseDefault(newUseDefault);
		// when reverting back to default, clear this field's val
		if (newUseDefault) {
			changeVal('');
			clearWorkingTitle(tableId, recordId, lang);
		}
	};
	return (
		<Widget>
			<FieldLabel>Title <em>(<span>{lang}</span>)</em></FieldLabel>
			<PreviewUrlContainer>	
				{currentTitleDisplay || <div className="preloader"><Preloader size={25} /></div>}
			</PreviewUrlContainer>
			<EditorContainer>
				{!useDefault && (
					<React.Fragment>
						<div className="inputContainer">
							<TextInput val={val || ''} size={50} changeVal={onChangeVal} />
						</div>
					</React.Fragment>
				)}
			</EditorContainer>
			<FunctionsContainer>
				<Button small onClick={onOverride}>{useDefault ? 'Edit' : 'Revert to default'}</Button>
			</FunctionsContainer>
			<FieldDescription>The url to the page is automatically built using a preconfigured pattern, but it can be overridden if the generated url is not suitable. The url needs to be validated on the backend in order to make sure it doesn't conflict with any other url and to remove special characters. You can see the resulting preview above.</FieldDescription>
		</Widget>
	);

}

RecordTitle.propTypes = {
	val: PropTypes.string,
	lang: PropTypes.string,
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	workingTitle: PropTypes.string,
	fetchWorkingTitle: PropTypes.func,
	clearWorkingTitle: PropTypes.func,
	changeVal: PropTypes.func,
};
