import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Changelog from '../../components/changelog/Changelog';
import { fetchChangelog } from '../../actions/changelog';

export default connect(
	null,
	dispatch => bindActionCreators({ fetchChangelog }, dispatch)
)(Changelog);

