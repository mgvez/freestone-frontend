import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankFileInsert from '../../../components/form/helpers/BankFileInsert';

import { bankSelector } from '../../../selectors/bank';
import { addRecord, fetchList } from '../../../actions/record';
import { fetchTable } from '../../../actions/schema';
import { BANK_FILE_TABLE } from '../../../freestone/schemaProps';

export default connect(
	bankSelector(BANK_FILE_TABLE),
	dispatch => bindActionCreators({ fetchList, addRecord, fetchTable }, dispatch)
)(BankFileInsert);
