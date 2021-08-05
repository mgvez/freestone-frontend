import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styled from 'styled-components';
import colors from '../../styles/Colors';

const scale = 0.5;
const WidgetIframe = styled.iframe`
	transformOrigin: 0 0;
	transform: translate(-50%, -50%) scale(${scale});
	border: 0;
	width: 200%;
	height: 200%;
	display: block;
	border: 1px red solid;
`;

export function IFrame(props) {

	const [mountNode, setMountNode] = useState(null);

	const setContentRef = (contentRef) => {
		setMountNode(contentRef && contentRef.contentWindow && contentRef.contentWindow.document.body);
	};
	
	const { children, ...otherProps } = props;
	return (
		<WidgetIframe
			{...otherProps}
			ref={setContentRef}
		>
			{mountNode && createPortal(children, mountNode)}
		</WidgetIframe>
	);
}

IFrame.propTypes = {
	children: PropTypes.any,
};
