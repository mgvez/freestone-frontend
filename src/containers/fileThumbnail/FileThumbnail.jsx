import { connect } from 'react-redux';

import FileThumbnail from '../../components/fileThumbnail/FileThumbnail';

export default connect(
	state => {
		return {
			env: state.freestone.env.freestone,
		};
	}
)(FileThumbnail);

