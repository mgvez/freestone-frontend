import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LanguageToggler from '../../components/form/LanguageToggler';

import { userViewLanguageSelector } from '../../selectors/userViewLanguage';
import { setFieldViewLanguage } from '../../actions/env';

export default connect(
	userViewLanguageSelector,
	dispatch => bindActionCreators({ setFieldViewLanguage }, dispatch)
)(LanguageToggler);
