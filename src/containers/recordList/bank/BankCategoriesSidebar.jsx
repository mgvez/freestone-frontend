import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBankCategories, cancelBankSelect } from '../../../actions/bank';
import { goTo } from '../../../actions/nav';

import { bankSidebarSelector } from '../../../selectors/bank';
import BankCategoriesSidebar from '../../../components/recordList/bank/BankCategoriesSidebar';

export default connect(
	bankSidebarSelector,
	dispatch => bindActionCreators({ goTo, fetchBankCategories, cancelBankSelect }, dispatch)
)(BankCategoriesSidebar);
