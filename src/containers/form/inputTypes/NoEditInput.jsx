import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NoEditInput from '../../../components/form/inputTypes/NoEditInput';

import { fetchForeignLabel } from '../../../actions/foreignOptions';
import { foreignUneditableMapStateToProps } from '../../../selectors/foreignOptions';

export default connect(
	foreignUneditableMapStateToProps,
	dispatch => bindActionCreators({ fetchForeignLabel }, dispatch)	
)(NoEditInput);
