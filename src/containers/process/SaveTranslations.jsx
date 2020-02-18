import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SaveTranslations from '../../components/process/SaveTranslations';

import { saveTranslations } from '../../actions/translations';

export default connect(
	(state) => {
		return {
			translations: state.freestone.translations && state.freestone.translations.translations,
		};
	},
	dispatch => bindActionCreators({ saveTranslations }, dispatch)
)(SaveTranslations);
