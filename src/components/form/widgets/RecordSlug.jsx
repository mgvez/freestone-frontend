import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';
import { WidgetField, FieldLabel, FieldDescription } from '../../../styles/Input';
import { PromptWidget, Tooltip } from '../../../styles/Prompts';
import { WarningMessage } from '../../../styles/Texts';

import styled from 'styled-components';

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
	rewritePattern,
	domain,
}) {
	if (!tableId) return null;
	const [useDefault, setUseDefault] = useState(true);
	const [nonOverridable, setNonOverridable] = useState();

	useEffect(() => {
		let timeout;
		if (record && !workingSlugs) {
			timeout = setTimeout(() => {
				fetchWorkingSlug(tableId, lang, recordId, record, val);
			}, DEBOUNCE_DELAY);
		}
		// we keep non-overridable part in local state to avoid flashes
		if (workingSlugs) {
			setNonOverridable(workingSlugs.nonOverridable);
		}
		if (val && useDefault) {
			setUseDefault(false);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [tableId, recordId, record, val, workingSlugs]);

	const onChangeVal = (a) => {
		clearWorkingSlug(tableId, recordId, lang);
		changeVal(a);
	};

	const currentSlugCandidate = workingSlugs && `https://${domain}${rewritePattern.replace(':slug', workingSlugs.slug)}`;

	// if the preview slug was not avaliable directly, warn the user that the orginal slug was not available
	let warning = null;
	if (workingSlugs && workingSlugs.unavailable) {
		warning = (
			<Tooltip warning>
				<em>{workingSlugs.unavailable}</em> is not available
			</Tooltip>
		);
	}

	const currentSlugCandidateDisplay = currentSlugCandidate && (
		<PreviewUrl>
			<em>Url Preview: </em>
			{currentSlugCandidate}
		</PreviewUrl>
	);

	// when doing custom slugs, there might be a part that is non-verridable, which is all the part that comes before the first slash preceding a field on the original table
	const preSlug = `https://${domain}${rewritePattern.replace(':slug', nonOverridable)}`;

	const onOverride = () => {
		
		const newUseDefault = !useDefault;
		if (newUseDefault && val && !confirm('Are you sure you want to revert to the default URL?')) return;

		setUseDefault(newUseDefault);
		// when reverting back to default, clear this field's val
		if (newUseDefault) {
			changeVal('');
			clearWorkingSlug(tableId, recordId, lang);
		}
	};
	return (
		<WidgetField>
			<FieldLabel>Permalink <em>(<span>{lang}</span>)</em></FieldLabel>
			<PreviewUrlContainer>	
				{currentSlugCandidateDisplay || <div className="preloader"><Preloader size={25} /></div>}
				{warning}
			</PreviewUrlContainer>
			<EditorContainer>
				{!useDefault && (
					<React.Fragment>
						<div>{preSlug}</div>
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
		</WidgetField>
	);

}

RecordSlug.propTypes = {
	val: PropTypes.string,
	lang: PropTypes.string,
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	record: PropTypes.object,
	workingSlugs: PropTypes.object,
	rewritePattern: PropTypes.string,
	domain: PropTypes.string,
	fetchWorkingSlug: PropTypes.func,
	clearWorkingSlug: PropTypes.func,
	changeVal: PropTypes.func,
};
