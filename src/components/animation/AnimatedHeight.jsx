
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import useMaxHeight from '../../hooks/useMaxHeight';

const animTime = 150;

const Animation = styled.div`
	transition: all 0.15s ease;
	height: auto;
	overflow: hidden;

	&.appear,
	&.enter {
		height: 0;
	}
	&.appear-active,
	&.enter-active,
	&.exit {
		${props => `height: ${props.maxHeight}px;`}
	}
	&.exit-active {
		height: 0;
	}
`;

const AnimatedHeight = ({
	isOpen,
	children,	
}) => {

	const [maxHeight, infoRef] = useMaxHeight();

	const styles = {};
	if (maxHeight) {
		styles.height = isOpen ? maxHeight : 0;
	}
	styles.opacity = isOpen ? 1 : 0;

	return (
		<CSSTransition
			in={isOpen}
			appear
			timeout={animTime}
			unmountOnExit
		>
			<Animation maxHeight={maxHeight}>
				<div ref={infoRef}>
					{children}
				</div>
			</Animation>
		</CSSTransition>
	);
};

AnimatedHeight.propTypes = {
	isOpen: PropTypes.bool,
	children: PropTypes.any,
};

export default AnimatedHeight;
