import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import { IFrame } from '../../widgets/IFrame';
// import { GridContainer, GridItem } from '../../../styles/Grid';


export const Container = styled.div`
	display: flex;
	width: 100%;
`;

const getPanelCss = ({ ratio }) => `
	position: relative;
	width: calc(${ratio * 100}% - 3px);
`;
export const Panel = styled.div`${props => getPanelCss(props)}`;
	

export const Slider = styled.div`
	position: relative;
	width: 5px;
	border-left: 1px black solid;
	cursor: col-resize;
`;

export default function ContentBlockPreview({
	tableId,
	recordId,
	previewRecord,
	records,
	fetchContentBlockPreview,
	setPreviewWidth,
	form,
	previewSettings = {},
}) {

	const [previewHtml, setPreviewHtml] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const containerRef = useRef();
	const ratio = previewSettings.ratio || 0.3;

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

	const onDrag = useCallback(e => {
		if (!containerRef.current) return false;
		e.preventDefault();
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const targetRatio = x / (rect.right - rect.left);
		setPreviewWidth(tableId, targetRatio);
	}, [containerRef, setPreviewWidth, tableId]);

	const endDrag = useCallback(() => {
		document.documentElement.removeEventListener('mousemove', onDrag);
		document.documentElement.removeEventListener('mouseup', endDrag);
	}, [onDrag]);

	const startDrag = useCallback(() => {
		document.documentElement.addEventListener('mousemove', onDrag);
		document.documentElement.addEventListener('mouseup', endDrag);
	}, [onDrag, endDrag]);
	
	useEffect(() => {
		endDrag();
		return () => {
			endDrag();
		};
	}, [onDrag, endDrag]);

	const previewScale = Math.min(0.6, Math.max(0.1, ratio));

	return (
		<Container ref={containerRef}>
			<Panel ratio={ratio}>
				<IFrame scale={previewScale}><div dangerouslySetInnerHTML={{ __html: previewHtml }} /></IFrame>
				{isLoading && <Preloader />}
			</Panel>
			<Slider onMouseDown={startDrag} />
			<Panel ratio={1 - ratio}>
				{form}
			</Panel>
		</Container>
	);

}

ContentBlockPreview.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	previewRecord: PropTypes.string,
	records: PropTypes.object,
	form: PropTypes.element,
	previewSettings: PropTypes.shape({
		ratio: PropTypes.number,
	}),
	fetchContentBlockPreview: PropTypes.func,
	setPreviewWidth: PropTypes.func,
};
