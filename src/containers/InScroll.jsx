import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InScrollComp from '../components/InScroll';

import { routeSelector } from '../selectors/route';
import { lockScroll } from '../actions/nav';

const InScroll = connect(
	routeSelector,
	dispatch => bindActionCreators({ lockScroll }, dispatch)
)(InScrollComp);

export default InScroll;
