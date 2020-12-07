import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import cssVariables from '../../styles/Variables';
import { useDimensions } from '../../hooks/useDimensions';

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


	//add a padding to top when making header fixed, so as not to make content go up
	const pad = isFixed ? (<div style={{ height, marginBottom: margins.bottom }} />) : null;

	const content = props.renderContent && props.renderContent({
		reportDimensions,
		isFixed,
	});

	return (
		<div>
			{pad}
			{content}
		</div>
	);


}

FixedHeader.propTypes = {
	renderContent: PropTypes.func,
};
