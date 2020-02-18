import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BoolSwitch from '../../components/recordList/BoolSwitch';

import { saveSingleValue } from '../../actions/save';

export default connect(
	null,
	dispatch => bindActionCreators({ saveSingleValue }, dispatch)
)(BoolSwitch);
