import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldGroup from '../../components/form/FieldGroup';

import { toggleFieldGroup } from '../../actions/fieldgroup';
import { fieldGroupVisibleMapStateToProps } from '../../selectors/fieldgroup';

export default connect(
	fieldGroupVisibleMapStateToProps(),
	dispatch => bindActionCreators({ toggleFieldGroup }, dispatch)
)(FieldGroup);
