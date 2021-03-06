import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordInteractions from '../../components/recordList/RecordInteractions';

import { routeSelector } from '../../selectors/route';
import { lockScroll, rememberListPage } from '../../actions/nav';
import { fetchRecordInfo } from '../../actions/record';


export default connect(
	routeSelector,
	dispatch => bindActionCreators({ lockScroll, rememberListPage, fetchRecordInfo }, dispatch)
)(RecordInteractions);
