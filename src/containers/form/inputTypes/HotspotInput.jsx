import { connect } from 'react-redux';

import HotspotInput from '../../../components/form/inputTypes/HotspotInput';

import { hotspotSelector } from '../../../selectors/hotspot.js';

export default connect(
	hotspotSelector,
)(HotspotInput);
