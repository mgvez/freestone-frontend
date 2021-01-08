
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMaxHeight from '../../hooks/useMaxHeight';

export const Wrapper = styled.div`
	transition: all 0.15s ease;
	height: auto;
	overflow: hidden;
`;

const AnimatedHeight = ({
	isOpen,
	children,	
}) => {

	const [maxHeight, infoRef, resetHeight] = useMaxHeight();

	const styles = {};
	if (maxHeight) {
		styles.height = isOpen ? maxHeight : 0;
	}
	styles.opacity = isOpen ? 1 : 0;

	return (
		<Wrapper ref={infoRef} style={styles}>
			{children}
		</Wrapper>
	);
};

AnimatedHeight.propTypes = {
	isOpen: PropTypes.bool,
	children: PropTypes.any,
};

export default AnimatedHeight;
