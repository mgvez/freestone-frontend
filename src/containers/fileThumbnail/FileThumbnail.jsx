import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FileThumbnail from '../../components/fileThumbnail/FileThumbnail';
import { fetchBankImage } from '../../actions/bank';
import { bankImgThumbnailSelector } from '../../selectors/bank';

export default connect(
	state => {
		return {
			env: state.freestone.env.freestone,
		};
	}
)(FileThumbnail);

