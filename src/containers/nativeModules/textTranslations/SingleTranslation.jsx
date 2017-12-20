import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SingleTranslation from '../../../components/nativeModules/textTranslations/SingleTranslation';

import { editTranslation } from '../../../actions/translations';
import { singleTranslationMapStateToProps } from '../../../selectors/translations';

export default connect(
	singleTranslationMapStateToProps,
	dispatch => bindActionCreators({ editTranslation }, dispatch)
)(SingleTranslation);
