import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { routeSelector } from '../../../selectors/route';

import BankListCell from '../../../components/recordList/bank/BankListCell';
import { lockScroll, rememberListPage } from '../../../actions/nav';

export default connect(
	(state) => {
		return {
			lang: state.freestone.env.freestone.defaultLanguage,
			...routeSelector(state),
		};
	},
	dispatch => bindActionCreators({ lockScroll, rememberListPage }, dispatch)
)(BankListCell);
