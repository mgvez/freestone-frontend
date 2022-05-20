import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Heading2 } from '../../styles/Texts';

export default function SaveContentBlockDependencies(props) {

	const [statusMessage, setStatusMessage] = useState();

	useEffect(() => {
		props.saveDependencies(props.dependencies, setStatusMessage, props.onFinish);
	}, []);

	return (
		<section className="saving">
			<Heading2>{statusMessage}</Heading2>
		</section>
	);
}

SaveContentBlockDependencies.propTypes = {
	dependencies: PropTypes.array,
	saveDependencies: PropTypes.func,
	onFinish: PropTypes.func,
};

