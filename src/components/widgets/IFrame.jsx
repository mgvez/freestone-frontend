import React, { useEffect, useRef, useState } from 'react';
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
		transform: translate(${translatePrc}%, ${translatePrc}%) scale(${scale});
		border: 0;
		width: ${blowupPrc}%;
		height: ${pxHeight}px;
		max-width: 1920px;
		display: block;
	`;
};

export const WidgetIframe = styled.iframe`${props => getIframeCss(props)}`;

export function IFrame(props) {
	const [mountNode, setMountNode] = useState(null);
	const [contentHeight, setContentHeight] = useState(null);

	const setContentRef = (contentRef) => {
		setMountNode(contentRef && contentRef.contentWindow && contentRef.contentWindow.document.body);
	};
	
	const { children, ...otherProps } = props;

	useEffect(() => {
		if (mountNode && props.reportHeight) {
			console.log(mountNode.scrollHeight);
			props.reportHeight(mountNode.scrollHeight);
			setContentHeight(mountNode.scrollHeight);
		}
	}, [children]);

	return (
		<WidgetIframe
			{...otherProps}
			pxHeight={contentHeight}
			ref={setContentRef}
		>
			{mountNode && createPortal(children, mountNode)}
		</WidgetIframe>
	);
}

IFrame.propTypes = {
	children: PropTypes.any,
	scale: PropTypes.number,
	reportHeight: PropTypes.func,
};
