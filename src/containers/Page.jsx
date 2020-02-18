import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Page from '../components/Page';

import { lockScroll, rememberListPage, goTo, setPageHash } from '../actions/nav';
import { duplicateRecord } from '../actions/record';
import { pageSelector } from '../selectors/page';

export default connect(
	pageSelector,
	dispatch => bindActionCreators({ goTo, lockScroll, rememberListPage, setPageHash, duplicateRecord }, dispatch)
)(Page);
