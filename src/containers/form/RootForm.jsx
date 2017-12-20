import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RootForm from '../../components/form/RootForm';

import { fetchTable } from '../../actions/schema';
import { goTo } from '../../actions/nav';
import { fetchRecordRevisionList } from '../../actions/record';
import { rootFormMapStateToProps } from '../../selectors/rootForm';

export default connect(
	rootFormMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, goTo, fetchRecordRevisionList }, dispatch)
)(RootForm);
