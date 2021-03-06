import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from './reducers';

const middleware = [thunk];

const store = createStore(
    combinedReducer,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store