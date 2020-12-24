import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderTexts } from '../../styles/Header';
import { Heading2 } from '../../styles/Texts';
import { MODAL_TRANSITION_MS } from '../../styles/Modal';

export default function SaveContentBlockDependencies(props) {

	useEffect(() => {
		props.saveDependencies(props.dependencies, props.onFinish);
	}, []);

	return (
		<section className="saving">
			<Header>
				<HeaderTexts>
					<Heading2>Saving...</Heading2>
				</HeaderTexts>	
			</Header>
		</section>
	);
}

SaveContentBlockDependencies.propTypes = {
	dependencies: PropTypes.array,
	saveDependencies: PropTypes.func,
	onFinish: PropTypes.func,
};

