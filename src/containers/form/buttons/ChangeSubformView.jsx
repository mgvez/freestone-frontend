import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeSubformView from '../../../components/form/buttons/ChangeSubformView';

import { setSubformViewType } from '../../../actions/subform';
import { subformViewMapStateToProps } from '../../../selectors/subform';

export default connect(
	null,
	dispatch => bindActionCreators({ setSubformViewType }, dispatch)
)(ChangeSubformView);
