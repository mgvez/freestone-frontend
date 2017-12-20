import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormHeaderVariation from '../../components/header/FormHeaderVariation';

import { fetchSlug } from '../../actions/slugs';
import { formHeaderSelector } from '../../selectors/formHeader';
const actionCreators = { fetchSlug };

export default connect(
	formHeaderSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(FormHeaderVariation);
