import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Changelog from '../../components/changelog/Changelog';
import { fetchChangelog } from '../../actions/changelog';
import { setFieldVal } from '../../actions/record';
import { changelogMapStateToProps } from '../../selectors/changelog';

export default connect(
	changelogMapStateToProps(),
	dispatch => bindActionCreators({ fetchChangelog, setFieldVal }, dispatch)
)(Changelog);

