import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import cssVariables from '../../styles/Variables';
import { useDimensions } from '../../hooks/useDimensions';
import { Header, HeaderTexts, HeaderFcn, headerMarginBottom } from '../../styles/Header';

/*
	Will make the form header fixed / inline as needed
*/
export default function FixedHeader(props) {
	
	const [isFixed, setIsFixed] = useState(false);
	const [height, , margins, reportDimensions] = useDimensions();

	useEffect(() => {
		const onScroll = () => {
			const st = window.pageYOffset;
			const newIsFixed = (st >= cssVariables.topHeaderHeight + (height / 2));
			if (newIsFixed !== isFixed) setIsFixed(newIsFixed);
		};

		window.addEventListener('scroll', onScroll);
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [isFixed, setIsFixed, height]);

	// const style = {
	// 	width: isFixed && isViewingPreview && previewType === 'iframe' ? '50%' : '100%',
	// };

	//add a padding to top when making header fixed, so as not to make content go up
	const pad = isFixed ? (<div style={{ height, marginBottom: margins.bottom }} />) : null;

	const headerRef = useRef();

	const classList = [];
	if (isFixed) classList.push('light');

	useEffect(() => {
		const rect = headerRef.current.getBoundingClientRect();
		reportDimensions(rect.width, rect.height, { bottom: headerMarginBottom });
	}, []);
	// <Header className={classList.join(' ')} style={style} ref={headerRef}>
	return (
		<div>
			{pad}
			<Header ref={headerRef} className={classList.join(' ')}>
				<HeaderTexts columns="8">
					{props.infos && props.infos(isFixed)}
				</HeaderTexts>

				<HeaderFcn columns="4" offset="9" justify="end" align="end">
					{props.buttons && props.buttons(isFixed)}
				</HeaderFcn>

				<div className="popout">
					{props.popout && props.popout(isFixed)}
				</div>
			</Header>
		</div>
	);


}

FixedHeader.propTypes = {
	infos: PropTypes.func,
	buttons: PropTypes.func,
	popout: PropTypes.func,
};
