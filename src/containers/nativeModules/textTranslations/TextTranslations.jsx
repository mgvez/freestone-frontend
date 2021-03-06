import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextTranslations from '../../../components/nativeModules/textTranslations/TextTranslations';

import { fetchTranslations, closeTranslations, clearTranslations, searchTranslations, navigateSearchTranslation, navigateTranslationsGroups } from '../../../actions/translations';
import { goTo } from '../../../actions/nav';
import { coreTranslations } from '../../../selectors/translations';

export default connect(
	coreTranslations,
	dispatch => bindActionCreators({ clearTranslations, fetchTranslations, closeTranslations, goTo, searchTranslations, navigateSearchTranslation, navigateTranslationsGroups }, dispatch)
)(TextTranslations);
