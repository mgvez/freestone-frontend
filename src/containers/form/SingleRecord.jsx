import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SingleRecord from '../../components/form/SingleRecord';

import { formRecordMapStateToProps } from '../../selectors/formRecord';
import { fetchTable } from '../../actions/schema';
import { fetchRecord, setFieldVal } from '../../actions/record';
import { toggleFieldGroup, showFieldGroup } from '../../actions/fieldgroup';

export default connect(
	formRecordMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, fetchRecord, setFieldVal, toggleFieldGroup, showFieldGroup }, dispatch)
)(SingleRecord);
