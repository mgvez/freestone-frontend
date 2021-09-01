import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

const getIframeCss = props => {
	const pxHeight = props.pxHeight || 100;
	return `
		transformOrigin: 0 0;
		border: 0;
		width: ${props.width ? `${props.width}px` : '100%'};
		height: ${pxHeight}px;
		max-width: 1920px;
		display: block;
		overflow: hidden;
		border: 1px red solid;
	`;
};

export const WidgetIframe = styled.iframe`${props => getIframeCss(props)}`;

export function IFrame(props) {
	const [mountNode, setMountNode] = useState(null);
	const [contentHeight, setContentHeight] = useState(null);
	const [viewportMeta] = useState(document.createElement('meta'));

	const setContentRef = (contentRef) => {
		setMountNode(contentRef && contentRef.contentWindow && contentRef.contentWindow.document);
	};

	const { children, ...otherProps } = props;

	const computeHeight = useCallback((e) => {
		if (!mountNode) return;
		const body = mountNode.body;
		const html = body.parentNode;
		mountNode.body.style.zoom = 1;
		const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) * props.scale;
		mountNode.body.style.zoom = props.scale;

		props.reportHeight(height);
		setContentHeight(height);
	}, [props.reportHeight, setContentHeight, mountNode, props.scale, contentHeight]);

	useEffect(() => {
		if (mountNode && props.reportHeight) {
			computeHeight();
			const imgs = Array.from(mountNode.getElementsByTagName('img'));
			imgs.forEach(img => {
				img.addEventListener('load', computeHeight);
			});
			// viewportMeta.name = 'viewport';
			// viewportMeta.content = 'width=1920, initial-scale=1';
			// mountNode.head.appendChild(viewportMeta);

			return () => {
				imgs.forEach(img => {
					img.removeEventListener('load', computeHeight);
				});
			};

		}
	}, [children, contentHeight, mountNode, props.scale]);

	return (
		<WidgetIframe
			{...otherProps}
			pxHeight={contentHeight}
			ref={setContentRef}
			scrolling="no"
			width={props.width}
		>
			{mountNode && createPortal(children, mountNode.body)}
		</WidgetIframe>
	);
}

IFrame.propTypes = {
	children: PropTypes.any,
	scale: PropTypes.number,
	width: PropTypes.number,
	reportHeight: PropTypes.func,
};
