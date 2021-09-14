import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import { WidgetField, FieldLabel, FieldDescription } from '../../../styles/Input';


const Tabs = styled.div`
	display: flex;
`;
function getTabCss(props) {
	return css`
		border: 1px ${colors.borderFormAccent} solid;
		font-size: 0.8em;
		font-weight: bold;
		margin-right: 4px;
		min-width: 90px;
		padding: 0.5em;
		text-align: center;
		cursor: pointer;
		${props.active && `
			border-color: white;
			background: white;
			cursor: default;
		`}
	`;
}
const Tab = styled.div`${props => getTabCss(props)}`;

const PreviewContainer = styled.div`

	.preloader {
		position: relative;
		left: 0;
		width: 0;
	}
`;
const PreviewVal = styled.pre`
	padding: 1em;
	margin-top: -1px;
	font-size: 1em;
	max-height: 200px;
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
	.inputContainer {
		input {
			margin: 0 0 0 5px;
		}
	}
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

	const [isEditing, setIsEditing] = useState(false);
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	useEffect(() => {
		let timeout;
		if (record && !workingStructured) {
			timeout = setTimeout(() => {
				fetchWorkingStructured(tableId, lang, recordId, record, val);
			}, DEBOUNCE_DELAY);
		}
		if (val && useDefault) {
			setUseDefault(false);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [tableId, recordId, record, val, workingStructured]);

	const onChangeVal = (a) => {
		clearWorkingStructured(tableId, recordId, lang);
		changeVal(a);
	};

	let content;
	if (isEditing) {
		const onOverride = () => {
			const newUseDefault = !useDefault;
			if (newUseDefault && val && !confirm('Are you sure you want to revert to the default value?')) return;
	
			setUseDefault(newUseDefault);
			// when reverting back to default, clear this field's val
			if (newUseDefault) {
				changeVal('');
				clearWorkingStructured(tableId, recordId, lang);
			}
		};
		content = (
			<React.Fragment>
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
					<Button small onClick={onOverride}>{useDefault ? 'Override default value' : 'Revert to default'}</Button>
				</FunctionsContainer>
				<FieldDescription>The structured data will be parsed as a Twig template</FieldDescription>
			</React.Fragment>
		);
	} else {
		const currentPreviewDisplay = workingStructured && (
			<React.Fragment>
				<PreviewVal>
					{workingStructured}
				</PreviewVal>
			</React.Fragment>
		);
		content = (
			<PreviewContainer>	
				{currentPreviewDisplay || <div className="preloader"><Preloader size={25} /></div>}
			</PreviewContainer>
		);
	}

	return (
		<WidgetField>
			<FieldLabel>Structured data / Dynamic metas <em>(<span>{lang}</span>)</em></FieldLabel>
			<Tabs>
				<Tab active={!isEditing} onClick={isEditing ? toggleEditing : null}>Preview</Tab>
				<Tab active={isEditing} onClick={!isEditing ? toggleEditing : null}>Edit</Tab>
			</Tabs>
			
			{content}
		</WidgetField>
	);

}

RecordStructuredData.propTypes = {
	val: PropTypes.string,
	lang: PropTypes.string,
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	workingStructured: PropTypes.string,
	fetchWorkingStructured: PropTypes.func,
	clearWorkingStructured: PropTypes.func,
	changeVal: PropTypes.func,
};
