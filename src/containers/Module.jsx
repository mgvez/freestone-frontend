import { connect } from 'react-redux';

import ModuleComp from '../components/Module';

const Module = connect(
	(state, props) => {
		const { url } = props.params;
		const modules = state.freestone.nav.structure.modules;
		let module = {};
		if (modules) {
			module = modules.find(mod => mod.url === url);
		}
		return { 
			jwt: state.freestone.auth.jwt,
			...module,
		};
	}
)(ModuleComp);

export default Module;
