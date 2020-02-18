import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeleteRecord from '../../../components/form/buttons/DeleteRecord';

import { setRecordDeleted, setShownRecord } from '../../../actions/record';

export default connect(
	null,
	dispatch => bindActionCreators({ setRecordDeleted, setShownRecord }, dispatch)
)(DeleteRecord);
