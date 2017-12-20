import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageComp from '../components/Page';

import { lockScroll, rememberListPage, goTo, setPageHash } from '../actions/nav';
import { duplicateRecord } from '../actions/record';
import { pageSelector } from '../selectors/page';

const Page = connect(
	pageSelector,
	dispatch => bindActionCreators({ goTo, lockScroll, rememberListPage, setPageHash, duplicateRecord }, dispatch)
)(PageComp);

export default Page;
