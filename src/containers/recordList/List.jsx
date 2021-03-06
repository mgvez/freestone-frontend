import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '../../components/recordList/List';

import { listRecordsSelector } from '../../selectors/listRecords';

import { fetchTable } from '../../actions/schema';
import { fetchList, addRecord } from '../../actions/record';
import { goTo } from '../../actions/nav';
import { toggleNavVisibility } from '../../actions/siteHeader';

export default connect(
	listRecordsSelector,
	dispatch => bindActionCreators({ fetchTable, fetchList, addRecord, goTo, toggleNavVisibility }, dispatch)
)(List);
