import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import { BrowserRouter, Route, Link } from 'react-router-dom';
import { history, configureStore } from './connection';
import App from './App';

import { setStore } from 'freestone/api';

const store = configureStore();

window.React = React;
window.ReactDOM = ReactDOM;

setStore(store);

function render() {
	ReactDOM.render(
		<React.Fragment>
			<Provider store={store}>
				<App history={history} />
			</Provider>
		</React.Fragment>,
		document.getElementById('root')
	);
}

render();
