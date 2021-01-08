
import { useState, useEffect, useCallback } from 'react';
import useResizeObserver from 'use-resize-observer';

const useMaxHeight = () => {
	const [maxHeight, setMaxHeight] = useState(0);
	const [needsRecompute, setNeedsRecompute] = useState(false);
	const { ref } = useResizeObserver({
		onResize: dimensions => {
			const { height } = dimensions;
			if (needsRecompute || height > maxHeight) {
				setMaxHeight(height);
				setNeedsRecompute(false);
			}
		},
	});

	const resetHeight = useCallback(() => {
		setNeedsRecompute(true);
	});

	useEffect(() => {
		window.addEventListener('resize', resetHeight);
		return () => {
			window.removeEventListener('resize', resetHeight);
		};
	}, []);
	return [maxHeight, ref, resetHeight];
};

export default useMaxHeight;
