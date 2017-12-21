import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankImgInsert from '../../../components/form/helpers/BankImgInsert';

import { bankSelector } from '../../../selectors/bank';
import { addRecord, fetchList } from '../../../actions/record';
import { fetchTable } from '../../../actions/schema';
import { BANK_IMG_TABLE } from '../../../freestone/schemaProps';

export default connect(
	bankSelector(BANK_IMG_TABLE),
	dispatch => bindActionCreators({ fetchList, addRecord, fetchTable }, dispatch)
)(BankImgInsert);
