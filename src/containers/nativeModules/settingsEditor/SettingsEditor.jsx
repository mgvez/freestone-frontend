import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SettingsEditor from '../../../components/nativeModules/settingsEditor/SettingsEditor';

import { goTo } from '../../../actions/nav';
import {
	fetchSettingsEditorData,
	closeSettings,
	clearSettings,
	editSettings,
	setActiveGroup,
} from '../../../actions/settingsEditor';
import { settingsEditorSelector } from '../../../selectors/settingsEditor';

export default connect(
	settingsEditorSelector,
	dispatch => bindActionCreators({ goTo, fetchSettingsEditorData, closeSettings, clearSettings, editSettings, setActiveGroup }, dispatch)
)(SettingsEditor);
