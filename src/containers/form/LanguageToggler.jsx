import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LanguageToggler from '../../components/form/LanguageToggler';

import { userViewLanguageSelector } from '../../selectors/userViewLanguage';
import { setLanguage } from '../../actions/env';

export default connect(
	userViewLanguageSelector,
	dispatch => bindActionCreators({ setLanguage }, dispatch)
)(LanguageToggler);
