import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Nav from '../../components/menu/Nav';

import { toggleCollapse, fetchNav } from '../../actions/nav';
import { navSelector } from '../../selectors/nav';

export default connect(
	navSelector,
	dispatch => bindActionCreators({ toggleCollapse, fetchNav }, dispatch)
)(Nav);
