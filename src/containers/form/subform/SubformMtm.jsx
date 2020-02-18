import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SubformMtm from '../../../components/form/subform/SubformMtm';

import { fetchTable } from '../../../actions/schema';
import { fetchMtmOptions, fetchMtmRecords, toggleMtm } from '../../../actions/record';
import { formMtmMapStateToProps } from '../../../selectors/formMtm';

export default connect(
	formMtmMapStateToProps,
	dispatch => bindActionCreators({ fetchMtmOptions, fetchMtmRecords, toggleMtm, fetchTable }, dispatch)
)(SubformMtm);
