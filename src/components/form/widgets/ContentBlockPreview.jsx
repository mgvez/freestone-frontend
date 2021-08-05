import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import { IFrame } from '../../widgets/IFrame';
import { GridContainer, GridItem } from '../../../styles/Grid';


export default function ContentBlockPreview({
	tableId,
	recordId,
	previewRecord,
	records,
	fetchContentBlockPreview,
	form,
}) {

	const [previewHtml, setPreviewHtml] = useState();
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(() => {
		const tid = setTimeout(() => {
			setIsLoading(true);
			fetchContentBlockPreview(previewRecord, records).then(res => {
				if (res.html) setPreviewHtml(res.html);
				setIsLoading(false);
			});
		}, 500);
		return () => {
			clearTimeout(tid);
		};
	}, [previewRecord]);

	return (
		<GridContainer>
			<GridItem columns="6">
				<IFrame><div dangerouslySetInnerHTML={{ __html: previewHtml }} /></IFrame>
				{isLoading && <Preloader />}
			</GridItem>
			<GridItem columns="6">
				{form}
			</GridItem>
		</GridContainer>
	);

}

ContentBlockPreview.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	previewRecord: PropTypes.object,
	records: PropTypes.object,
	form: PropTypes.element,
	fetchContentBlockPreview: PropTypes.func,
};
