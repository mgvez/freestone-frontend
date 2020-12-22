import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextTranslations from '../../containers/nativeModules/textTranslations/TextTranslations';
import BlockFieldDeps from '../../containers/nativeModules/blockFieldDeps/BlockFieldDeps';

export default class NativeModule extends Component {
	static propTypes = {
		name: PropTypes.string,
	};

	render() {
		// console.log(this.props);
		switch (this.props.name) {
		case 'TextTranslations':
			return <TextTranslations />;
		case 'ContentBlockDependencies':
			return <BlockFieldDeps />;
		default:
			return null;
		}
	}
}
