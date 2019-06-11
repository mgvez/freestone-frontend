import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBankCategories } from '../../../actions/bank';
import { bankCategoriesSelector } from '../../../selectors/bank';
import BankList from '../../../components/recordList/bank/BankList';

export default connect(
	bankCategoriesSelector,
	dispatch => bindActionCreators({ fetchBankCategories }, dispatch)
)(BankList);
