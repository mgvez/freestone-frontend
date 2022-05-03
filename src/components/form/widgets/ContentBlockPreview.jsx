import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Preloader } from '../../widgets/Preloader';
import { IFrame } from '../../widgets/IFrame';
import { useRect } from '../../../hooks/useRect';
import { 
	SUBFORM_PREVIEW_MODE_PREVIEWS,
	SUBFORM_PREVIEW_MODE_MIXED,
	SUBFORM_PREVIEW_MODE_EDIT,
} from '../../../freestone/schemaProps';

const DEFAULT_RATIO = 0.6;
const MIN_SCALE = 0.3;
const MAX_SCALE = 0.6;

export const Container = styled.div`
	display: flex;
	width: 100%;
`;

const getPanelCss = ({ ratio, height }) => `
	position: relative;
	${height ? `height: ${height}px;` : ''}
	width: calc(${ratio * 100}% - 3px);
`;
export const Panel = styled.div`${props => getPanelCss(props)}`;
	

export const Slider = styled.div`
	position: relative;
	width: 5px;
	border-left: 1px black solid;
	cursor: col-resize;
`;

const SCREEN_WIDTHS = [
	640, 720, 1440, 1920,
];

export default function ContentBlockPreview({
	previewRecord,
	records,
	fetchContentBlockPreview,
	setPreviewWidth,
	form,
	previewSettings = {},
	subPreviewMode,
}) {
	const [previewHtml, setPreviewHtml] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [ratio, setRatio] = useState(previewSettings.ratio);
	const containerRef = useRef();
	const [previewPanelRect, previewPanelRef] = useRect();
	const [previewScreenW, setPreviewScreenW] = useState(SCREEN_WIDTHS[2]);

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
		// console.log(x, rect.right - rect.left);
		const targetRatio = x / (rect.right - rect.left);
		setRatio(targetRatio);
	}, [containerRef, setRatio]);

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

	useEffect(() => {
		if (!ratio) {
			return undefined;
		}
		const debouncedSetRatio = () => {
			setPreviewWidth(ratio);
		};
		const t = setTimeout(debouncedSetRatio, 500);
		return () => {
			clearTimeout(t);
		};
	}, [ratio, setPreviewWidth]);

	const isFullPreviews = subPreviewMode === SUBFORM_PREVIEW_MODE_PREVIEWS;
	let finalRatio = isFullPreviews ? 1 : ratio || DEFAULT_RATIO;
	finalRatio = Math.min(MAX_SCALE, Math.max(MIN_SCALE, finalRatio));
	let previewScale = isFullPreviews ? MAX_SCALE : finalRatio;

	const [contentHeight, setContentHeight] = useState(0);
	console.log('render');
	const updateHeight = useCallback((v) => {
		if (v > contentHeight) setContentHeight(v);
	}, [setContentHeight]);

	// how wide must the panel be to display desired screen width
	const targetRatio = previewPanelRect.width / previewScreenW;
	let targetPreviewW = null;
	if (targetRatio > 1) {
		targetPreviewW = previewScreenW;
		previewScale = 1;
	} else {
		previewScale = targetRatio;
	}
	// console.log('targetRatio %s ', targetRatio);
	console.log('finalRatio %s scale %s, w %s', finalRatio, previewScale, targetPreviewW);

	const previewPanel = previewHtml && (
		<Panel ratio={finalRatio} height={contentHeight} ref={previewPanelRef}>
			<IFrame
				scale={previewScale || 1}
				width={targetPreviewW}
				reportHeight={updateHeight}
			>
				<div dangerouslySetInnerHTML={{ __html: previewHtml }} />
			</IFrame>
			{isLoading && <Preloader />}
		</Panel>
	);


	let op;
	switch (subPreviewMode) {
		case SUBFORM_PREVIEW_MODE_PREVIEWS: {
			op = previewPanel;
			break;
		}
		case SUBFORM_PREVIEW_MODE_EDIT: {
			op = form;
			break;
		}
		case SUBFORM_PREVIEW_MODE_MIXED:
		default: {
			op = (
				<React.Fragment>
					{previewPanel}
					<Slider onMouseDown={startDrag} />
					<Panel ratio={1 - finalRatio}>
						{form}
					</Panel>
				</React.Fragment>
			);
			break;
		}
	}

	return (
		<Container ref={containerRef}>{op}</Container>
	);

}

ContentBlockPreview.propTypes = {
	tableId: PropTypes.number,
	recordId: PropTypes.string,
	previewRecord: PropTypes.string,
	subPreviewMode: PropTypes.string,
	records: PropTypes.object,
	form: PropTypes.element,
	previewSettings: PropTypes.shape({
		ratio: PropTypes.number,
	}),
	fetchContentBlockPreview: PropTypes.func,
	setPreviewWidth: PropTypes.func,
};
