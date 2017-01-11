
import { hashHistory } from 'react-router';

import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

export const store = configureStore();
//changer dans configurestore aussi si on passe à browserHistory
export const appHistory = syncHistoryWithStore(hashHistory, store);
