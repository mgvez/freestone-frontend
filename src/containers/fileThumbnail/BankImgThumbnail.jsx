import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankImgThumbnail from '../../components/fileThumbnail/BankImgThumbnail';
import { fetchBankImage } from '../../actions/bank';
import { bankImgThumbnailSelector } from '../../selectors/bank';

export default connect(
	bankImgThumbnailSelector,
	dispatch => bindActionCreators({ fetchBankImage }, dispatch)
)(BankImgThumbnail);

