import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeleteBtn from '../../components/recordList/DeleteBtn';

import { deleteRecord } from '../../actions/save';

export default connect(
	null,
	dispatch => bindActionCreators({ deleteRecord }, dispatch)
)(DeleteBtn);
