import {GlobalActionTypes} from "../Actions/GlobalAction";
export const GlobalInitialState = {
    refresh: {on: 'Login', signed: true},
    fetching: false,
    trivialData: null
}
export function GlobalReducer(state = GlobalInitialState, action) {
    let versionedState;
    switch (action.type) {
        case GlobalActionTypes.CHANGE_REFRESH_STATUS:
            versionedState = {
                ...state,
                refresh: {
                    ...action.payload
                }
            };
            break;
        case GlobalActionTypes.FETCHING_DATA:
            versionedState = {
                ...state,
                fetching: action.payload,
            };
            break;
        case GlobalActionTypes.STORE_TRIVIAL_DATA:
            versionedState = {
                ...state,
                trivialData: action.payload,
            };
            break;
        default:
            versionedState = {...state}
    }
    return versionedState;
}