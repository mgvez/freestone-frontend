import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldGroup from '../../components/form/FieldGroup';

import { toggleFieldGroup, showFieldGroup } from '../../actions/fieldgroup';
import { fieldGroupsMapStateToProps } from '../../selectors/fieldgroup';

export default connect(
	fieldGroupsMapStateToProps(),
	dispatch => bindActionCreators({ showFieldGroup, toggleFieldGroup }, dispatch)
)(FieldGroup);
