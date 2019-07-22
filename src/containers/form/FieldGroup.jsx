import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldGroup from '../../components/form/FieldGroup';

import { toggleFieldGroup, tabbedFieldGroup } from '../../actions/fieldgroup';
import { fieldGroupVisibleMapStateToProps, fieldGroupCollapsedMapStateToProps } from '../../selectors/fieldgroup';

export default connect(
	fieldGroupCollapsedMapStateToProps(),
	fieldGroupVisibleMapStateToProps(),
	dispatch => bindActionCreators({ tabbedFieldGroup, toggleFieldGroup }, dispatch)
)(FieldGroup);
