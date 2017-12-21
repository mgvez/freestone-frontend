import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecord from '../../../components/form/buttons/AddRecord';

import { addRecord, setShownRecord } from '../../../actions/record';

export default connect(
	null,
	dispatch => bindActionCreators({ addRecord, setShownRecord }, dispatch)
)(AddRecord);
