import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useInView } from 'react-intersection-observer';
import useMaxHeight from '../../hooks/useMaxHeight';

import { FixedHeaderContainer, Header, HeaderTexts, HeaderFcn, Popout } from '../../styles/Header';

/*
	Will make the form header fixed / inline as needed
*/
export default function FixedHeader(props) {

	// detect if header is sticky or relative
	const [wrapperRef, isRelative, entry] = useInView({
		threshold: 1,
	});

	const isFixed = !isRelative;

	const [maxHeight, headerRef] = useMaxHeight();
	const classList = [];
	
	return (
		<FixedHeaderContainer ref={wrapperRef} style={{ height: maxHeight }}>
			<div ref={headerRef} >
				<Header className={classList.join(' ')}>
					<HeaderTexts columns="8">
						{props.infos && props.infos(isFixed)}
					</HeaderTexts>

					<HeaderFcn columns="4" offset="9" justify="end" align="end">
						{props.buttons && props.buttons(isFixed)}
					</HeaderFcn>
				</Header>
				{props.popout && (
					<Popout>
						{props.popout(isFixed)}
					</Popout>
				)}
			</div>
		</FixedHeaderContainer>
	);


}

FixedHeader.propTypes = {
	infos: PropTypes.func,
	buttons: PropTypes.func,
	popout: PropTypes.func,
};
