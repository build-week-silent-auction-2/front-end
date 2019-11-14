import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {reducer as bidReducer } from './Reducers/bidReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(bidReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
<Provider store={store}>
    <Router>
        <App />
    </Router>
</Provider>, 
document.getElementById('root'));

