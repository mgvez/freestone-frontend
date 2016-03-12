
import { push as pushPath } from 'react-router-redux';
import { unauthorized } from 'actions/auth';


export default store => next => action => {

	function gotoLogin() {
		// console.log(store.getState());
		const redirectAfterLogin = store.getState().routing.path;
		store.dispatch(pushPath(`/login?next=${redirectAfterLogin}`));
		return next(action);
	}

	switch (action.type) {
	case 'LOGIN_USER_FAILURE':
	case 'LOGOUT_USER':
		next(unauthorized());
		return gotoLogin();
	case 'UNAUTHORIZED':
		return gotoLogin();
	default:
		return next(action);
	}
};
