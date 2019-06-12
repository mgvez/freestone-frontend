import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveSingleRecord } from '../../../actions/save';
import BankCategoryAdd from '../../../components/recordList/bank/BankCategoryAdd';

export default connect(
	null,
	dispatch => bindActionCreators({ saveSingleRecord }, dispatch)
)(BankCategoryAdd);
