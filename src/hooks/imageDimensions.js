import React, { useState, useMemo } from 'react';

export const useImageDimensions = src => {
	const [naturalWidth, setNaturalWidth] = useState(null);
	const [naturalHeight, setNaturalHeight] = useState(null);

	useMemo(() => {
		if (!src) return;
		const img = document.createElement('img');
		img.src = src;

		const setNaturalDimensions = () => {
			setNaturalWidth(img.naturalWidth);
			setNaturalHeight(img.naturalHeight);
			img.removeEventListener('load', setNaturalDimensions);
		};

		if (img.naturalWidth) {
			setNaturalDimensions();
			return;
		}
		img.addEventListener('load', setNaturalDimensions);
		return () => {
			img.removeEventListener('load', setNaturalDimensions);
		};
	}, [src]);

	return [naturalWidth, naturalHeight];
};
