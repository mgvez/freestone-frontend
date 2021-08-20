import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeSubformView from '../../../components/form/buttons/ChangeSubformView';

import { setSubformViewType } from '../../../actions/subform';
import { subformViewMapStateToProps } from '../../../selectors/subform';

export default connect(
	subformViewMapStateToProps(),
	dispatch => bindActionCreators({ setSubformViewType }, dispatch)
)(ChangeSubformView);
