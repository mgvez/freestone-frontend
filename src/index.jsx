import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import { BrowserRouter, Route, Link } from 'react-router-dom';
import { history, configureStore } from './connection';
import { AppContainer } from 'react-hot-loader';
import App from './App';

import { setStore } from 'freestone/api';

const store = configureStore();

window.React = React;
window.ReactDOM = ReactDOM;

setStore(store);

function render() {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App history={history} />
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
}

render();

if (module.hot) {
	// Reload components
	module.hot.accept('./App', () => {
		render();
	});
}
