import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InfosFcn from '../../components/recordList/InfosFcn';

import { fetchRecordInfo } from '../../actions/record';


export default connect(
	null,
	dispatch => bindActionCreators({ fetchRecordInfo }, dispatch)
)(InfosFcn);
