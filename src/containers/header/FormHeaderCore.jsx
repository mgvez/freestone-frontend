import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormHeaderCore from '../../components/header/FormHeaderCore';

import { fetchSlug } from '../../actions/slugs';
import { setIsPreviewing } from '../../actions/record';
import { formHeaderSelector } from '../../selectors/formHeader';
const actionCreators = { fetchSlug, setIsPreviewing };

export default connect(
	formHeaderSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(FormHeaderCore);
