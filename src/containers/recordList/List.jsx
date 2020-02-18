import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '../../components/recordList/List';

import { listRecordsSelector } from '../../selectors/listRecords';

import { fetchTable } from '../../actions/schema';
import { fetchList, addRecord } from '../../actions/record';
import { goTo } from '../../actions/nav';

export default connect(
	listRecordsSelector,
	dispatch => bindActionCreators({ fetchTable, fetchList, addRecord, goTo }, dispatch)
)(List);
