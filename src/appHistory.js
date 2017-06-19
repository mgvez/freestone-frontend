
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';

export const store = configureStore();
//changer dans configurestore aussi si on passe à browserHistory
export const appHistory = syncHistoryWithStore(hashHistory, store);
