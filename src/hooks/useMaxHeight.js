
import { useState, useEffect } from 'react';
import useResizeObserver from 'use-resize-observer';

const useMaxHeight = () => {
	const [maxHeight, setMaxHeight] = useState(0);
	const { ref } = useResizeObserver({
		onResize: dimensions => {
			const { height } = dimensions;
			if (maxHeight === 'auto' || height > maxHeight) {
				setMaxHeight(height);
			}
		},
	});

	useEffect(() => {
		const resetHeight = () => {
			setMaxHeight('auto');
		};
		window.addEventListener('resize', resetHeight);
		return () => {
			window.removeEventListener('resize', resetHeight);
		};
	}, []);
	return [maxHeight, ref];
};

export default useMaxHeight;
