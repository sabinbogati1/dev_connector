import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

// const initialState = {};
// const middleware = [thunk];

//first Param --> Root Reducer
//Second Param --> InitialState
//Third Param --> Middleware

// const store = createStore(() => rootReducer, initialState, compose(applyMiddleware(...middleware),
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
    ));

//const store = createStore(rootReducer, compose(applyMiddleware(thunk)) );

export default store;