import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearData, startPerf, stopPerf } from '../actions/dev';
import { clearErrors } from '../actions/errors';
import { logout } from '../actions/auth';
import { clearSchema } from '../actions/schema';

import { SiteHeader as SiteHeaderComp } from '../components/header/SiteHeader';
import { isGodSelector } from '../selectors/credentials';

const actionCreators = { clearErrors, clearData, startPerf, stopPerf, clearSchema, logout };

const SiteHeader = connect(
	isGodSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(SiteHeaderComp);

export default SiteHeader;
