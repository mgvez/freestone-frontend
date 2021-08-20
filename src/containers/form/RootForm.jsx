import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RootForm from '../../components/form/RootForm';

import { fetchTable } from '../../actions/schema';
import { goTo } from '../../actions/nav';
import { rootFormMapStateToProps } from '../../selectors/rootForm';
import { setIsPreviewing } from '../../actions/preview';

export default connect(
	rootFormMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, goTo, setIsPreviewing }, dispatch)
)(RootForm);
