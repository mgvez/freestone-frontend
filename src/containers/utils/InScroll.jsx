import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InScroll from '../../components/utils/InScroll';

import { routeSelector } from '../../selectors/route';
import { lockScroll } from '../../actions/nav';

export default connect(
	routeSelector,
	dispatch => bindActionCreators({ lockScroll }, dispatch)
)(InScroll);
