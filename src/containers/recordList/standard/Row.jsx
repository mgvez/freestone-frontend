import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from '../../../components/recordList/standard/Row';

import { swapAnimated } from '../../../actions/record';
import { makeRecordQuickeditSelector } from '../../../selectors/record';

export default connect(
	makeRecordQuickeditSelector(),
	dispatch => bindActionCreators({ swapAnimated }, dispatch)
)(Row);
