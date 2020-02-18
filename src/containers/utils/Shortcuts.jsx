import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Shortcuts from '../../components/utils/Shortcuts';

import { toggleLanguage } from '../../actions/env';
const actionCreators = { toggleLanguage };

export default connect(
	null,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(Shortcuts);
