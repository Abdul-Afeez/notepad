export const GlobalActionTypes = {
    CHANGE_REFRESH_STATUS: 'CHANGE_REFRESH_STATUS',
    FETCHING_DATA: 'FETCHING_DATA',
    STORE_TRIVIAL_DATA: 'STORE_TRIVIAL_DATA'
}
export const GlobalActions = {
    changeRefreshStatus: (data) =>({type: GlobalActionTypes.CHANGE_REFRESH_STATUS, payload: data}),
    fetchingData: (data) => ({type: GlobalActionTypes.FETCHING_DATA, payload: data}),
    storeTrivialData: (data) => ({type: GlobalActionTypes.STORE_TRIVIAL_DATA, payload: data}),
}