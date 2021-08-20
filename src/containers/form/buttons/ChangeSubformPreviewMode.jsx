import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangeSubformPreviewMode from '../../../components/form/buttons/ChangeSubformPreviewMode';

import { setSubformPreviewMode } from '../../../actions/subform';
import { subformViewSelector } from '../../../selectors/subform';

export default connect(
	subformViewSelector,
	dispatch => bindActionCreators({ setSubformPreviewMode }, dispatch)
)(ChangeSubformPreviewMode);
