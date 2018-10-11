import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';

const combinedReducers = combineReducers({
    user: userReducer,
})

const store = createStore(combinedReducers, applyMiddleware(promiseMiddleware()));

export default store;