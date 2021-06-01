import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';

import styled from 'styled-components';

const scale = 0.5;
const WidgetIframe = styled.iframe`
	transformOrigin: 0 0;
	transform: translate(0px, 0px) scale(${scale});
	border: 1px ${colors.borderForm} solid;
`;

const Widget = styled.div`
	padding: 10px;
	margin: 0 0 0.7em;
	background: ${colors.backgroundMainAccent};
	border: 1px ${colors.borderForm} solid;
`;


export default function ContentBlockPreview({
	tableId,
	recordId,
	previewRecord,
	records,
	fetchContentBlockPreview,
}) {
	if (!tableId || !previewRecord) return null;
	const [previewHtml, setPreviewHtml] = useState();
	useEffect(() => {
		const tid = setTimeout(() => {
			fetchContentBlockPreview(previewRecord, records).then(res => {
				if (res.html) setPreviewHtml(res.html);
			});
		}, 500);
		return () => {
			clearTimeout(tid);
		};
	}, [previewRecord]);

	return (
		<Widget className="freestone-preview">
			<div dangerouslySetInnerHTML={{ __html: previewHtml }} />
		</Widget>
	);

}

ContentBlockPreview.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	previewRecord: PropTypes.object,
	records: PropTypes.object,
	fetchContentBlockPreview: PropTypes.func,
};
