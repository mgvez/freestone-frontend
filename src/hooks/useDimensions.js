import { useState, useEffect } from 'react';

export const useDimensions = () => {
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const [margins, setMargins] = useState({});

	useEffect(() => {
		// reset height on resize, debounced
		let timeout;
		const handleResize = () => {
			clearTimeout(timeout);
			setHeight(0);
		};
		const debounceResize = () => {
			if (timeout) { clearTimeout(timeout); }
			timeout = setTimeout(handleResize, 250);
		};
		window.addEventListener('resize', debounceResize);
		return () => {
			clearTimeout(timeout);
			window.removeEventListener('resize', debounceResize);
		};
	});


	// store the heights reported by the children
	const reportDimensions = (w, h, m) => {
		setWidth(w);
		setHeight(h);
		if (m.top !== margins.top || m.right !== margins.right || m.bottom !== margins.bottom || m.left !== margins.left) {
			setMargins(m);
		}

	};
	return [height, width, margins, reportDimensions];
};
