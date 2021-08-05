import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styled from 'styled-components';
import colors from '../../styles/Colors';

const scale = 1;
const WidgetIframe = styled.iframe`
	transformOrigin: 0 0;
	transform: translate(0px, 0px) scale(${scale});
	border: 0;
	width: 100%;
	height: 100%;
	display: block;
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
