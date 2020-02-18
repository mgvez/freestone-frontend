import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankFileThumbnail from '../../components/fileThumbnail/BankFileThumbnail';

import { fetchBankFile } from '../../actions/bank';
import { bankFileItemSelector } from '../../selectors/bank';

export default connect(
	bankFileItemSelector,
	dispatch => bindActionCreators({ fetchBankFile }, dispatch)
)(BankFileThumbnail);

