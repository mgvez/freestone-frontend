import { unauthorized, LOGIN_USER_FAILURE, LOGOUT_USER, UNAUTHORIZED } from 'actions/auth';

export default store => next => action => {// eslint-disable-line

	switch (action.type) {
	case LOGIN_USER_FAILURE:
	case LOGOUT_USER:
		next(unauthorized());
		return next(action);
	case UNAUTHORIZED:
		return next(action);
	default:
		return next(action);
	}
};
