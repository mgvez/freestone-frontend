import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeSubformView from '../../../components/form/buttons/ChangeSubformView';

import { setSubformViewType } from '../../../actions/subform';
import { subformViewSelector } from '../../../selectors/subform';

export default connect(
	subformViewSelector,
	dispatch => bindActionCreators({ setSubformViewType }, dispatch)
)(ChangeSubformView);
