import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QuickeditField from '../../../components/recordList/standard/QuickeditField';

import { setQuickeditFieldVal } from '../../../actions/record';
import { quickeditFieldMapStateToProps } from '../../../selectors/listRecords';

export default connect(
	quickeditFieldMapStateToProps,
	dispatch => bindActionCreators({ setQuickeditFieldVal }, dispatch)
)(QuickeditField);
