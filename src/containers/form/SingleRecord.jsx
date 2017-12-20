import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SingleRecord from '../../components/form/SingleRecord';

import { formRecordMapStateToProps } from '../../selectors/formRecord';
import { fetchTable } from '../../actions/schema';
import { fetchRecord, setFieldVal } from '../../actions/record';

export default connect(
	formRecordMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, fetchRecord, setFieldVal }, dispatch)
)(SingleRecord);
