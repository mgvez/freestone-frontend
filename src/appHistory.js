import { hashHistory } from 'react-router';

import { addMiddleware, configureStore } from './store';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const routeMiddleware = routerMiddleware(hashHistory);

addMiddleware(routeMiddleware);

export const store = configureStore();
//changer dans configurestore aussi si on passe à browserHistory
export const appHistory = syncHistoryWithStore(hashHistory, store);
