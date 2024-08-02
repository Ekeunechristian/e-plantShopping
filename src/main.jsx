// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js'; // Import the Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the Redux store to the entire app */}
      <App />
    </Provider>
  </React.StrictMode>
);
