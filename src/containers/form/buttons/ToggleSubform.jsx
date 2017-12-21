import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToggleSubform from '../../../components/form/buttons/ToggleSubform';

import { formCollapsedMapStateToProps } from '../../../selectors/formCollapsed';
import { setSubformCollapsed } from '../../../actions/subform';

export default connect(
	formCollapsedMapStateToProps,
	dispatch => bindActionCreators({ setSubformCollapsed }, dispatch)
)(ToggleSubform);
