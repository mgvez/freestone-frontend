import { connect } from 'react-redux';

import NativeModule from '../../components/nativeModules/NativeModule';

export default connect(
	state => { return { jwt: state.freestone.auth.jwt }; }
)(NativeModule);
