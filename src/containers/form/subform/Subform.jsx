import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Subform from '../../../components/form/subform/Subform';

import { fetchTable } from '../../../actions/schema';
import { setSubformCollapsed } from '../../../actions/subform';
import { subformMapStateToProps } from '../../../selectors/subform';

export default connect(
	subformMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, setSubformCollapsed }, dispatch)
)(Subform);