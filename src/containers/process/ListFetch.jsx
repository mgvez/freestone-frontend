import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListFetch from '../../components/process/ListFetch';

import { fetchList } from '../../actions/record';

export default connect(
	null,
	dispatch => bindActionCreators({ fetchList }, dispatch)
)(ListFetch);

