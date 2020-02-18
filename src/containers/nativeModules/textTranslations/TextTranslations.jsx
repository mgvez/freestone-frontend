import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextTranslations from '../../../components/nativeModules/textTranslations/TextTranslations';

import { fetchTranslations, closeTranslations } from '../../../actions/translations';
import { goTo } from '../../../actions/nav';
import { coreTranslations } from '../../../selectors/translations';

export default connect(
	coreTranslations,
	dispatch => bindActionCreators({ fetchTranslations, closeTranslations, goTo }, dispatch)
)(TextTranslations);
