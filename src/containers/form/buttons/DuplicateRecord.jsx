import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DuplicateRecord from '../../../components/form/buttons/DuplicateRecord';

import { addRecord, setShownRecord } from '../../../actions/record';
import { singleRecordMapStateToProps } from '../../../selectors/record';

export default connect(
	singleRecordMapStateToProps,
	dispatch => bindActionCreators({ addRecord, setShownRecord }, dispatch)
)(DuplicateRecord);
