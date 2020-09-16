import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LatestModifs from '../../components/dashboard/LatestModifs';

import { fetchLatestModifs } from '../../actions/changelog';

export default connect(
	null,
	dispatch => bindActionCreators({ fetchLatestModifs }, dispatch)
)(LatestModifs);

