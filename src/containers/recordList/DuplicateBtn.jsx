import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DuplicateBtn from '../../components/recordList/DuplicateBtn';
import { duplicateRecord } from '../../actions/record';

export default connect(
	null,
	dispatch => bindActionCreators({ duplicateRecord }, dispatch)
)(DuplicateBtn);
