import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormHeaderVariation from '../../components/header/FormHeaderVariation';

import { fetchSlug } from '../../actions/slugs';
import { setIsPreviewing } from '../../actions/record';
import { formHeaderSelector } from '../../selectors/formHeader';
const actionCreators = { fetchSlug, setIsPreviewing };

export default connect(
	formHeaderSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(FormHeaderVariation);
