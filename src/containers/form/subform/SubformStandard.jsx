import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SubformStandard from '../../../components/form/subform/SubformStandard';

import { formChildrenRecordsMapStateToProps } from '../../../selectors/formChildrenRecords';
import { fetchRecord, setOrder, setShownRecord, toggleShownRecord } from '../../../actions/record';
import { fetchTable } from '../../../actions/schema';

export default connect(
	formChildrenRecordsMapStateToProps,
	dispatch => bindActionCreators({ fetchRecord, setOrder, setShownRecord, toggleShownRecord, fetchTable }, dispatch)
)(SubformStandard);
