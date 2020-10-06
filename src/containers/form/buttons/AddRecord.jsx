import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecord from '../../../components/form/buttons/AddRecord';

import { addRecord, setShownRecord } from '../../../actions/record';
import { addRecordMapStateToProps } from '../../../selectors/subform';

export default connect(
	addRecordMapStateToProps,
	dispatch => bindActionCreators({ addRecord, setShownRecord }, dispatch)
)(AddRecord);
