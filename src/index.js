import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'react-router-dom'
import App from './App';
import history from './routes/history'
import { Provider } from 'react-redux';
import store from './pages/redux/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
