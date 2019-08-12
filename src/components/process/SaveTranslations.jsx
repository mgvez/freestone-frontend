import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderTexts } from '../../styles/Header';
import { Heading2 } from '../../styles/Texts';

export default class SaveTranslations extends Component {
	static propTypes = {
		translations: PropTypes.object,
		saveTranslations: PropTypes.func,
		callback: PropTypes.func,

	};

	componentDidMount() {

		const onFinish = this.props.saveTranslations(this.props.translations);
		onFinish.then(this.props.callback);
	}

	render() {
		
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
}
