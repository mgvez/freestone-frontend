import { connect } from 'react-redux';

import NativeModule from '../../components/nativeModules/NativeModule';

export default connect(
	(state, props) => { 
		return {
			jwt: state.freestone.auth.jwt,
			name: props.match.params.name,
		};
	}
)(NativeModule);
