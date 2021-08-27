import { useState, useEffect, useRef, useCallback } from 'react';

/**
	Used for a component to report its dimensions on each render and when its content images are loaded
*/
const reportRect = (contentRef, onRecomputed) => {
	const [imagesLoaded, setImagesLoaded] = useState(false);
	// keep a string of the dimensions to avoid calling the effect at each update
	// even if the coords are unchanged , which happens if we put an object in the state
	const [rectObserver, setRectObserver] = useState();
	const recomputeTimeoutId = useRef();

	// recompute and change the state, so that the callback will be executed when there's a change to coords
	const recompute = () => {
		if (contentRef.current) {
			const rc = contentRef.current.getBoundingClientRect();
			const pr = `${rc.top},${rc.right},${rc.bottom},${rc.left}`;
			setRectObserver(pr);
		}
	};

	useEffect(() => {
		if (contentRef.current) {
			const { top, right, bottom, left, width, height, x, y } = contentRef.current.getBoundingClientRect();
			onRecomputed({
				top,
				right,
				bottom,
				left,
				width,
				height,
				x,
				y,
				offsetTop: contentRef.current.offsetTop,
				offsetLeft: contentRef.current.offsetLeft,
			});
		}
	}, [rectObserver, onRecomputed, contentRef]);

	// debounce
	const onRecompute = () => {
		if (recomputeTimeoutId.current) {
			clearTimeout(recomputeTimeoutId.current);
		}
		recomputeTimeoutId.current = setTimeout(recompute, 20);
	};

	useEffect(
		// eslint-disable-next-line consistent-return
		() => {
			onRecompute();

			window.addEventListener('resize', onRecompute);

			// adds listeners to relayout when all images will be loaded
			if (!imagesLoaded && contentRef.current) {
				const images = Array.from(contentRef.current.querySelectorAll('img'));
				if (!images.length) {
					setImagesLoaded(true);
				}
				// is there an unloaded image amongst the images?
				const hasNotLoaded = images.find(img => !img.complete || !img.naturalWidth);
				if (hasNotLoaded) {
					images.forEach(img => (
						img.addEventListener('load', onRecompute)
					));
					// cleanup on unmount
					return () => {
						images.forEach(img => (
							img.removeEventListener('load', onRecompute)
						));
						window.removeEventListener('resize', onRecompute);
					};
				}
				setImagesLoaded(true);
			}
			return () => {
				window.removeEventListener('resize', onRecompute);
			};
		}
	);
};

export const useRect = () => {
	const nodeRef = useRef(null);
	const [rect, setRect] = useState({});
	const onRecomputed = useCallback(r => {
		setRect(r);
	}, []);

	reportRect(nodeRef, onRecomputed);
	return [rect, nodeRef];
};
