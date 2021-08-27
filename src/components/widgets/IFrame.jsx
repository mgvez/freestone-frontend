import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styled from 'styled-components';
import colors from '../../styles/Colors';

const getIframeCss = props => {
	const scale = props.scale || 0.3;
	const pxHeight = props.pxHeight || 100;
	const translatePrc = -(1 - scale) * 50;
	const blowupPrc = 100 / scale;
	return `
		transformOrigin: 0 0;
		border: 0;
		width: 90%;
		height: ${pxHeight}px;
		max-width: 1920px;
		display: block;
		border: 1px red solid;
		overflow: hidden;
	`;
};

export const WidgetIframe = styled.iframe`${props => getIframeCss(props)}`;

export function IFrame(props) {
	const [mountNode, setMountNode] = useState(null);
	const [contentHeight, setContentHeight] = useState(null);

	const setContentRef = (contentRef) => {
		setMountNode(contentRef && contentRef.contentWindow && contentRef.contentWindow.document);
	};
	
	const { children, ...otherProps } = props;

	const computeHeight = useCallback((e) => {
		if (!mountNode) return;
		const body = mountNode.body;
		const html = body.parentNode;
		mountNode.body.style.zoom = 1;
		const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		mountNode.body.style.zoom = props.scale;

		props.reportHeight(height * props.scale);
		setContentHeight(height * props.scale);
		console.log('%s => %s', contentHeight, height);
	}, [props.reportHeight, setContentHeight, mountNode, props.scale, contentHeight]);

	useEffect(() => {
		if (mountNode && props.reportHeight) {
			computeHeight();
			const imgs = Array.from(mountNode.getElementsByTagName('img'));
			imgs.forEach(img => {
				img.addEventListener('load', computeHeight);
			});
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
		>
			{mountNode && createPortal(children, mountNode.body)}
		</WidgetIframe>
	);
}

IFrame.propTypes = {
	children: PropTypes.any,
	scale: PropTypes.number,
	reportHeight: PropTypes.func,
};
