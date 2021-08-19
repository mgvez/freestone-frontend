import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeSubformPreviewMode from '../../../components/form/buttons/ChangeSubformPreviewMode';

import { setSubformPreviewMode } from '../../../actions/subform';
import { subformViewMapStateToProps } from '../../../selectors/subform';

export default connect(
	subformViewMapStateToProps,
	dispatch => bindActionCreators({ setSubformPreviewMode }, dispatch)
)(ChangeSubformPreviewMode);
