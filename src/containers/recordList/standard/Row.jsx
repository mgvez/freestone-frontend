import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from '../../../components/recordList/standard/Row';

import { swapAnimated } from '../../../actions/record';

export default connect(
	null,
	dispatch => bindActionCreators({ swapAnimated }, dispatch)
)(Row);
