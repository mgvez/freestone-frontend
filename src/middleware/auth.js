import { unauthorized, LOGIN_USER_FAILURE, LOGOUT_API, UNAUTHORIZED } from '../actions/auth';

export default store => next => action => {// eslint-disable-line

	switch (action.type) {
	case LOGIN_USER_FAILURE:
	case LOGOUT_API.SUCCESS:
		next(unauthorized());
		return next(action);
	case UNAUTHORIZED:
		return next(action);
	default:
		return next(action);
	}
};
