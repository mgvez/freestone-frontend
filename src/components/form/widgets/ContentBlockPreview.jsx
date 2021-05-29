import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import TextInput from '../inputTypes/TextInput';
import { Button } from '../../../styles/Button';
import colors from '../../../styles/Colors';

import styled from 'styled-components';

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
	fetchContentBlockPreview,
}) {
	if (!tableId || !previewRecord) return null;
	console.log(previewRecord);
	const [previewHtml, setPreviewHtml] = useState();

	useEffect(() => {
		const tid = setTimeout(() => {
			fetchContentBlockPreview(previewRecord).then(res => {
				if (res.html) setPreviewHtml(res.html);
			});
		}, 500);
		return () => {
			clearTimeout(tid);
		};
	}, [previewRecord]);

	return (
		<Widget>
			{`PREVIEW ${tableId}.${recordId}`}
			<div dangerouslySetInnerHTML={{ __html: previewHtml }} />
		</Widget>
	);

}

ContentBlockPreview.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	previewRecord: PropTypes.object,
	fetchContentBlockPreview: PropTypes.func,
};
