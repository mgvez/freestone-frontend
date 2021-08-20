import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextTranslations from '../../containers/nativeModules/textTranslations/TextTranslations';
import BlockFieldDeps from '../../containers/nativeModules/blockFieldDeps/BlockFieldDeps';
import SettingsEditor from '../../containers/nativeModules/settingsEditor/SettingsEditor';

export default class NativeModule extends Component {
	static propTypes = {
		name: PropTypes.string,
	};

	render() {
		switch (this.props.name) {
			case 'TextTranslations':
				return <TextTranslations />;
			case 'ContentBlockDependencies':
				return <BlockFieldDeps />;
			case 'settings':
				return <SettingsEditor />;
			default:
				return null;
		}
	}
}
