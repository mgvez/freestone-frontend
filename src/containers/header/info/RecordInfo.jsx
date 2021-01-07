import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordInfo from '../../../components/header/info/RecordInfo';

import { fetchSlug } from '../../../actions/slugs';
import { recordInfoSelector } from '../../../selectors/recordInfoSelector';
const actionCreators = { fetchSlug };

export default connect(
	recordInfoSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(RecordInfo);
