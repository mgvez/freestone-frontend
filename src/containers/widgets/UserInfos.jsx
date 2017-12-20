import { connect } from 'react-redux';

import UserInfos from '../../components/widgets/UserInfos';

export default connect(
	state => { return state.freestone.auth; },
)(UserInfos);
