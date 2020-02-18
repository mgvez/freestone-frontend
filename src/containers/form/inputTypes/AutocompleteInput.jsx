import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AutocompleteInput from '../../../components/form/inputTypes/AutocompleteInput';

import { fetchForeignOptions } from '../../../actions/foreignOptions';
import { foreignOptionsMapStateToProps } from '../../../selectors/foreignOptions';

export default connect(
	foreignOptionsMapStateToProps,
	dispatch => bindActionCreators({ fetchForeignOptions }, dispatch)	
)(AutocompleteInput);
