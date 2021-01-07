
import React from 'react';
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

	const [maxHeight, infoRef] = useMaxHeight();

	const infoStyle = {};
	if (maxHeight) {
		infoStyle.height = isOpen ? maxHeight : 0;
	}
	infoStyle.opacity = isOpen ? 1 : 0;

	return (
		<Wrapper ref={infoRef} style={infoStyle}>
			{children}
		</Wrapper>
	);
};

AnimatedHeight.propTypes = {
	isOpen: PropTypes.bool,
	children: PropTypes.any,
};

export default AnimatedHeight;
