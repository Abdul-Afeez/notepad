import {combineReducers, createStore, applyMiddleware} from "redux";
import {GlobalReducer} from "./GlobalReducer";
import createSagaMiddleware from "redux-saga";
import {GlobalSaga} from "../Saga/GlobalSaga";
const AppReducer = combineReducers({
    globalState: GlobalReducer
})
const sagaMiddleware = createSagaMiddleware();
const RootReducer = (state, action) => {
    return AppReducer(state, action);
};
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(GlobalSaga)

export default store;
